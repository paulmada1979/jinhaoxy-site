// One-shot MT cleanup script. Apply known Azure mistranslation fixes across
// all blog translation JSONs. Idempotent — running twice is fine.
import fs from "node:fs";
import path from "node:path";

const viDir = "src/content/blog/vi";
const zhDir = "src/content/blog/zh";

// VI: "hạ cánh" = airplane landing. Wrong for "land" as verb or "landed cost".
const viReplacements = [
  ["chi phí hạ cánh", "chi phí nhập kho"],
  ["Cutover nên hạ cánh", "Việc chuyển đổi nên rơi"],
  [
    "nén hạ cánh muộn hoặc hạ cánh thường xuyên hơn là hạ cánh đúng giờ",
    "bị nén thường về trễ hoặc lệch thời điểm hơn là kịp tiến độ",
  ],
  ["sẽ hạ cánh ở A hoặc B", "sẽ rơi vào A hoặc B"],
];

// ZH: "土地成本" / "登陆成本" = literal land cost; correct customs term is "到岸成本".
// "越南战争优势" = Vietnam War advantage; should be 成本优势 (cost advantage).
const zhReplacements = [
  ["土地成本", "到岸成本"],
  ["登陆成本", "到岸成本"],
  ["越南战争优势", "越南成本优势"],
];

function processDir(dir, replacements, label) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  let total = 0;
  for (const f of files) {
    const fp = path.join(dir, f);
    let txt = fs.readFileSync(fp, "utf-8");
    let changed = 0;
    for (const [from, to] of replacements) {
      const parts = txt.split(from);
      if (parts.length > 1) {
        changed += parts.length - 1;
        txt = parts.join(to);
      }
    }
    if (changed > 0) {
      fs.writeFileSync(fp, txt);
      console.log(`  ${label}/${f}: ${changed} fix(es)`);
      total += changed;
    }
  }
  console.log(`  Total ${label} fixes: ${total}`);
}

console.log("=== VI ===");
processDir(viDir, viReplacements, "vi");
console.log("=== ZH ===");
processDir(zhDir, zhReplacements, "zh");
