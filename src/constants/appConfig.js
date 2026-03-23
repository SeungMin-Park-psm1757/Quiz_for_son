export const DEFAULT_USER_ID = "local_player";
export const DEFAULT_USER_NAME = "정우";

export const CATEGORY_META = {
  fish_marine: {
    label: "물고기 친구들 🐠",
    shortLabel: "물고기 친구들",
    color: "#4682B4",
    backgroundColor: "#E6F2FF",
    accentColor: "#4682B4",
    playable: true,
  },
  animals: {
    label: "동물 친구들 🦁",
    shortLabel: "동물 친구들",
    color: "#FFD700",
    backgroundColor: "#FFF9E6",
    accentColor: "#FFD700",
    playable: true,
  },
  dinosaurs: {
    label: "공룡의 세계 🦖",
    shortLabel: "공룡의 세계",
    color: "#228B22",
    backgroundColor: "#E9F5E9",
    accentColor: "#228B22",
    playable: true,
  },
  insects: {
    label: "꿈틀꿈틀 곤충 🦋",
    shortLabel: "꿈틀꿈틀 곤충",
    color: "#BA55D3",
    backgroundColor: "#F3E5F5",
    accentColor: "#BA55D3",
    playable: true,
  },
  birds: {
    label: "새들의 세상 🐦",
    shortLabel: "새들의 세상",
    color: "#FF8C42",
    backgroundColor: "#FFF4E8",
    accentColor: "#FF8C42",
    playable: true,
  },
};

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_META).map(
  ([key, value]) => ({
    key,
    ...value,
  })
);

export const PLAYABLE_CATEGORY_OPTIONS = CATEGORY_OPTIONS.filter(
  (category) => category.playable !== false
);

export const getUserDisplayName = () => DEFAULT_USER_NAME;

export const getCategoryMeta = (category) =>
  CATEGORY_META[category] || {
    label: category,
    shortLabel: category,
    color: "#FF6347",
    backgroundColor: "#FFFFFF",
    accentColor: "#FF6347",
  };
