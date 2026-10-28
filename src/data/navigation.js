import obsidianCacao from "../assets/images/obsidian-cacao.jpg";
import emberCaramel from "../assets/images/ember-caramel.jpg";
import crimsonBerry from "../assets/images/crimson-berry.jpg";
import goldenTemper from "../assets/images/golden-temper.jpg";

export const flavors = [
  {
    name: "Obsidian Cacao",
    slug: "obsidian-cacao",
    note: "Dark Chocolate",
    desc: "Deep cacao, slow-roasted and unapologetically bitter-sweet.",
    image: obsidianCacao,
    accent: "forest",
  },
  {
    name: "Ember Caramel",
    slug: "ember-caramel",
    note: "Salted Caramel",
    desc: "Burnt-sugar caramel cut with a thread of sea salt.",
    image: emberCaramel,
    accent: "crimson",
  },
  {
    name: "Crimson Berry",
    slug: "crimson-berry",
    note: "Mixed Berry",
    desc: "Blackberry, raspberry, blueberry — crushed, not blended.",
    image: crimsonBerry,
    accent: "crimson",
  },
  {
    name: "Golden Temper",
    slug: "golden-temper",
    note: "Vanilla & Honey",
    desc: "Whole vanilla bean, tempered with raw honey.",
    image: goldenTemper,
    accent: "forest",
  },
];

export const navLinks = [
  { label: "Home", path: "/", index: "01", type: "link", blurb: "Back to where FORGE begins." },
  { label: "Flavors", path: "/flavors", index: "02", type: "flavors", blurb: "Four flavors. Zero shortcuts." },
  { label: "The Craft", path: "/the-craft", index: "03", type: "link", blurb: "How we actually make these." },
  { label: "Contact", path: "/contact", index: "04", type: "link", blurb: "Talk to an actual human." },
];