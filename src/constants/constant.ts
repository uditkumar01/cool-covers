const PATTERN_BASE_PATH = path.join(__dirname, "..", "public", "pattern");
// const SVGS_BASE_PATH = path.join(IMAGES_BASE_PATH, "..", "svgs");
const imgExts = ['.jpg', '.jpeg', '.png', '.gif']; 
const listImageNames = () => fs.readdirSync(PATTERN_BASE_PATH).filter(file => imgExts.includes(path.extname(file).toLowerCase()));
const PATTERNS_AVALIABLE = listImageNames();
console.log("PATTERNS_AVAILABLE", PATTERNS_AVALIABLE);
const GOOGLE_FONT_NAMES = [
  "Poppins",
  "Quicksand",
  "Rubik Distressed",
  "Silkscreen",
  "Luckiest Guy",
];

export default {
  PATTERNS_AVALIABLE,
  GOOGLE_FONT_NAMES,
  listImageNames
};
