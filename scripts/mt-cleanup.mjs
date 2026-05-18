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
// "长笛" = musical flute (instrument); for corrugated profile use 楞型 (léngxíng).
// "电击训练" = electric shock training; ECT (Edge Crush Test) → ECT 边压测试.
// Azure also cycles ECT into "电磁力" (electromagnetic force), "电击" (electric shock),
// "电休克" (electroconvulsive therapy), "电磁训练" (electromagnetic training), "电疗"
// (electrotherapy) — all should be bare ECT in body prose.
// ORDER NOTE: "电击" must come AFTER "电击训练" so the longer match wins first.
const zhReplacements = [
  ["土地成本", "到岸成本"],
  ["登陆成本", "到岸成本"],
  ["越南战争优势", "越南成本优势"],
  ["长笛", "楞型"],
  ["电击训练", "ECT 边压测试"],
  ["电磁力", "ECT"],
  ["电休克", "ECT"],
  ["电磁训练", "ECT"],
  ["电疗", "ECT"],
  ["电击", "ECT"],
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
