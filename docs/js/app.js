// シークレットキー（適当に変更してください）
const SECRET = "school2025";

function normalize(s){
  return (s||"").toString().trim().toLowerCase().replace(/\s+/g,"");
}

function ok(answer, expected){
  return normalize(answer) === normalize(expected);
}

// ステージごとの正解と次のページ
const stages = {
  "index": { answer: "3", next: "n/01.html" },
  "01": { answer: "blue", next: "02.html" },
  "02": { answer: "7", next: "03.html" },
  "03": { answer: "cat", next: "04.html" },
  "04": { answer: "music", next: "05.html" },
  "05": { answer: "12", next: "06.html" },
  "06": { answer: "star", next: "07.html" },
  "07": { answer: "secret", next: "08.html" }
};

document.addEventListener("DOMContentLoaded", () => {
  const ans = document.getElementById("ans");
  const msg = document.getElementById("msg");
  const go  = document.getElementById("go");
  if(!go) return;

  const pageId = document.body.dataset.page;
  const stage = stages[pageId];

  go.addEventListener("click", () => {
    const v = ans.value;
    if (ok(v, stage.answer)) {
      const progress = JSON.parse(localStorage.getItem("qr_progress")||"{}");
      progress[pageId] = true;
      localStorage.setItem("qr_progress", JSON.stringify(progress));
      location.href = stage.next;
    } else {
      msg.innerHTML = '<p class="error">ちがうみたい。もう一度考えて！</p>';
    }
  });
});
