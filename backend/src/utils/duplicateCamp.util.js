import stopword from "stopword";
import natural from "natural";
import Camp from "../models/camp.model.js";
import levenshtein from "fast-levenshtein";

const normalizeTitle = (title) => {
  return stopword.removeStopwords(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 1)
      .map((word) => natural.PorterStemmer.stem(word)),
  );
};

const jaccardSimilarity = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.length / union.size;
};

const editSimilarity = (a, b) => {
  const distance = levenshtein.get(a, b);
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - distance / maxLen;
};

const scoreSimilarity = (titleA, titleB) => {
  const tokensA = normalizeTitle(titleA);
  const tokensB = normalizeTitle(titleB);

  const jaccard = jaccardSimilarity(tokensA, tokensB);

  if (jaccard < 0.2) return 0;

  const edit = editSimilarity(titleA.toLowerCase(), titleB.toLowerCase());

  const adjustedEdit = edit * jaccard;

  return jaccard * 0.7 + adjustedEdit * 0.3;
};

const findDuplicate = async (title) => {
  const keywords = normalizeTitle(title);
  if (keywords.length === 0) return null;

  const camps = await Camp.find(
    { keywords: { $in: keywords } },
    { _id: 1, title: 1, keywords: 1 },
  ).limit(20);

  if (!camps.length) return null;

  const bestMatch = camps
    .map((camp) => ({
      campId: camp._id,
      title: camp.title,
      score: scoreSimilarity(title, camp.title),
    }))
    .filter((c) => c.score >= 0.55)
    .sort((a, b) => b.score - a.score)[0];

  return bestMatch || null;
};

export { findDuplicate, normalizeTitle };
