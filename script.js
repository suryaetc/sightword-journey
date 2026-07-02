/* ============================================================
   SightWord Journey — script.js
   Word data + speech + phonics + navigation + progress.
   Pure vanilla JS. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  /* ==========================================================
     1. SIGHT-WORD DATA  (Dolch / Fry based, grouped by grade)
     ----------------------------------------------------------
     Each entry: { w: word, p: [phonics parts], s: example sentence }
     - `p` splits the word into logical phoneme/syllable chunks
       that are highlighted one-by-one during "Sound It Out".
     - `s` is a short, friendly example sentence.
     ========================================================== */
  const WORDS = {
    1: [
      { w: "after",  p: ["af", "ter"],   s: "We play after lunch." },
      { w: "again",  p: ["a", "gain"],   s: "Let's read it again." },
      { w: "an",     p: ["an"],          s: "I ate an apple." },
      { w: "any",    p: ["a", "ny"],     s: "Do you have any pets?" },
      { w: "as",     p: ["as"],          s: "Run as fast as me." },
      { w: "ask",    p: ["a", "sk"],     s: "You can ask for help." },
      { w: "by",     p: ["by"],          s: "Sit by the window." },
      { w: "could",  p: ["c", "ould"],   s: "Could you help me?" },
      { w: "every",  p: ["ev", "e", "ry"], s: "I brush every day." },
      { w: "fly",    p: ["f", "ly"],     s: "Birds can fly high." },
      { w: "from",   p: ["fr", "om"],    s: "This gift is from me." },
      { w: "give",   p: ["g", "ive"],    s: "Give me the ball." },
      { w: "going",  p: ["go", "ing"],   s: "We are going home." },
      { w: "had",    p: ["h", "ad"],     s: "I had a big lunch." },
      { w: "has",    p: ["h", "as"],     s: "She has a red hat." },
      { w: "her",    p: ["h", "er"],     s: "This is her book." },
      { w: "him",    p: ["h", "im"],     s: "Give the pen to him." },
      { w: "his",    p: ["h", "is"],     s: "That is his dog." },
      { w: "how",    p: ["h", "ow"],     s: "How are you today?" },
      { w: "just",   p: ["j", "ust"],    s: "I just woke up." },
      { w: "know",   p: ["kn", "ow"],    s: "I know the answer." },
      { w: "let",    p: ["l", "et"],     s: "Let me try it." },
      { w: "live",   p: ["l", "ive"],    s: "We live near the park." },
      { w: "may",    p: ["m", "ay"],     s: "May I come in?" },
      { w: "of",     p: ["of"],          s: "A cup of milk." },
      { w: "old",    p: ["o", "ld"],     s: "My shoes are old." },
      { w: "once",   p: ["o", "nce"],    s: "Once upon a time." },
      { w: "open",   p: ["o", "pen"],    s: "Please open the door." },
      { w: "over",   p: ["o", "ver"],    s: "The cat jumped over." },
      { w: "put",    p: ["p", "ut"],     s: "Put it on the shelf." },
      { w: "round",  p: ["r", "ound"],   s: "The ball is round." },
      { w: "some",   p: ["s", "ome"],    s: "I want some water." },
      { w: "stop",   p: ["st", "op"],    s: "Stop at the red light." },
      { w: "take",   p: ["t", "ake"],    s: "Take your bag." },
      { w: "thank",  p: ["th", "ank"],   s: "Thank you so much!" },
      { w: "them",   p: ["th", "em"],    s: "Give them the toys." },
      { w: "then",   p: ["th", "en"],    s: "We ate, then slept." },
      { w: "think",  p: ["th", "ink"],   s: "I think it is fun." },
      { w: "walk",   p: ["w", "alk"],    s: "We walk to school." },
      { w: "were",   p: ["w", "ere"],    s: "They were happy." },
      { w: "when",   p: ["wh", "en"],    s: "When is your party?" },

      /* --- Added from Std 1 curriculum list --- */
      /* Math / concept words */
      { w: "add",      p: ["a", "dd"],        s: "Add two and three." },
      { w: "match",    p: ["m", "atch"],      s: "Match the socks." },
      { w: "less",     p: ["l", "ess"],       s: "Five is less than ten." },
      { w: "digit",    p: ["dig", "it"],      s: "Nine is a digit." },
      { w: "object",   p: ["ob", "ject"],     s: "A ball is an object." },
      { w: "number",   p: ["num", "ber"],     s: "Pick a number." },
      { w: "plus",     p: ["pl", "us"],       s: "Two plus two is four." },
      { w: "subtract", p: ["sub", "tract"],   s: "Subtract one from five." },
      { w: "place",    p: ["pl", "ace"],      s: "Put it in its place." },
      { w: "value",    p: ["val", "ue"],      s: "The value is ten." },
      { w: "zero",     p: ["ze", "ro"],       s: "Ten has a zero." },
      { w: "than",     p: ["th", "an"],       s: "Six is more than two." },
      { w: "sort",     p: ["s", "ort"],       s: "Sort the blocks." },
      { w: "compare",  p: ["com", "pare"],    s: "Compare the two." },
      { w: "similar",  p: ["sim", "i", "lar"],s: "These look similar." },
      { w: "before",   p: ["be", "fore"],     s: "Wash before you eat." },
      { w: "near",     p: ["n", "ear"],       s: "Sit near me." },
      { w: "equal",    p: ["e", "qual"],      s: "Two and two are equal." },
      { w: "different",p: ["dif","fer","ent"],s: "We are all different." },
      { w: "alike",    p: ["a", "like"],      s: "The twins look alike." },
      { w: "input",    p: ["in", "put"],      s: "This is the input." },
      { w: "output",   p: ["out", "put"],     s: "Check the output." },
      { w: "rule",     p: ["r", "ule"],       s: "Follow the rule." },
      { w: "use",      p: ["u", "se"],        s: "Use a pencil." },

      /* Short vowel / basic words */
      { w: "am",       p: ["am"],             s: "I am happy." },
      { w: "and",      p: ["a", "nd"],        s: "You and me." },
      { w: "at",       p: ["at"],             s: "Look at the sky." },
      { w: "can",      p: ["c", "an"],        s: "I can run fast." },
      { w: "get",      p: ["g", "et"],        s: "Get your coat." },
      { w: "did",      p: ["d", "id"],        s: "I did my work." },
      { w: "in",       p: ["in"],             s: "The cat is in the box." },
      { w: "if",       p: ["if"],             s: "Smile if you are glad." },
      { w: "is",       p: ["is"],             s: "The sky is blue." },
      { w: "it",       p: ["it"],             s: "It is a dog." },
      { w: "its",      p: ["it", "s"],        s: "The dog wags its tail." },
      { w: "will",     p: ["w", "ill"],       s: "I will help you." },
      { w: "not",      p: ["n", "ot"],        s: "Do not run." },
      { w: "on",       p: ["on"],             s: "Sit on the mat." },
      { w: "but",      p: ["b", "ut"],        s: "Small but strong." },
      { w: "up",       p: ["up"],             s: "Look up high." },
      { w: "make",     p: ["m", "ake"],       s: "Make a card." },
      { w: "made",     p: ["m", "ade"],       s: "I made lunch." },
      { w: "way",      p: ["w", "ay"],        s: "This way, please." },
      { w: "day",      p: ["d", "ay"],        s: "Have a nice day." },

      /* Long E */
      { w: "be",       p: ["be"],             s: "Be kind." },
      { w: "he",       p: ["he"],             s: "He is my friend." },
      { w: "she",      p: ["sh", "e"],        s: "She can sing." },
      { w: "we",       p: ["we"],             s: "We are a team." },
      { w: "see",      p: ["s", "ee"],        s: "I see the moon." },
      { w: "these",    p: ["th", "ese"],      s: "These are mine." },
      { w: "people",   p: ["peo", "ple"],     s: "Kind people help." },

      /* Long I */
      { w: "i",        p: ["i"],              s: "I like to read." },
      { w: "my",       p: ["m", "y"],         s: "This is my book." },
      { w: "like",     p: ["l", "ike"],       s: "I like apples." },
      { w: "time",     p: ["t", "ime"],       s: "It is time to go." },

      /* Long O */
      { w: "no",       p: ["n", "o"],         s: "There is no milk." },
      { w: "go",       p: ["g", "o"],         s: "Let's go home." },
      { w: "so",       p: ["s", "o"],         s: "I am so happy." },

      /* Long U */
      { w: "you",      p: ["y", "ou"],        s: "Thank you!" },
      { w: "your",     p: ["y", "our"],       s: "Is this your hat?" },

      /* TH words */
      { w: "the",      p: ["th", "e"],        s: "The sun is up." },
      { w: "this",     p: ["th", "is"],       s: "This is fun." },
      { w: "that",     p: ["th", "at"],       s: "That is mine." },
      { w: "there",    p: ["th", "ere"],      s: "Sit over there." },
      { w: "their",    p: ["th", "eir"],      s: "It is their turn." },

      /* WH words */
      { w: "what",     p: ["wh", "at"],       s: "What is that?" },
      { w: "which",    p: ["wh", "ich"],      s: "Which one is red?" },
      { w: "who",      p: ["wh", "o"],        s: "Who is there?" },

      /* OU / OW + OR/AR sounds */
      { w: "out",      p: ["ou", "t"],        s: "Let's go out." },
      { w: "would",    p: ["w", "ould"],      s: "Would you like tea?" },
      { w: "for",      p: ["f", "or"],        s: "This is for you." },
      { w: "more",     p: ["m", "ore"],       s: "I want more." },
      { w: "or",       p: ["or"],             s: "Tea or milk?" },
      { w: "part",     p: ["p", "art"],       s: "Do your part." },

      /* Irregular words */
      { w: "said",     p: ["s", "aid"],       s: "She said hello." },
      { w: "one",      p: ["o", "ne"],        s: "I have one dog." },
      { w: "two",      p: ["tw", "o"],        s: "I see two cats." },
      { w: "was",      p: ["w", "as"],        s: "It was fun." },
      { w: "have",     p: ["h", "ave"],       s: "I have a pet." }
    ],
    2: [
      { w: "always", p: ["al", "ways"],  s: "I always say please." },
      { w: "around", p: ["a", "round"],  s: "We ran around the tree." },
      { w: "because",p: ["be", "cause"], s: "I smiled because I won." },
      { w: "been",   p: ["b", "een"],    s: "I have been good." },
      { w: "before", p: ["be", "fore"],  s: "Wash hands before you eat." },
      { w: "best",   p: ["b", "est"],    s: "You are my best friend." },
      { w: "both",   p: ["b", "oth"],    s: "Both cats are soft." },
      { w: "buy",    p: ["b", "uy"],     s: "Let's buy some bread." },
      { w: "call",   p: ["c", "all"],    s: "Call me later." },
      { w: "cold",   p: ["c", "old"],    s: "The snow is cold." },
      { w: "does",   p: ["d", "oes"],    s: "Does he like cake?" },
      { w: "don't",  p: ["d", "on't"],   s: "Don't run inside." },
      { w: "fast",   p: ["f", "ast"],    s: "The car is fast." },
      { w: "first",  p: ["f", "irst"],   s: "I came in first." },
      { w: "five",   p: ["f", "ive"],    s: "I have five toes." },
      { w: "found",  p: ["f", "ound"],   s: "I found my shoe." },
      { w: "gave",   p: ["g", "ave"],    s: "She gave me a hug." },
      { w: "goes",   p: ["g", "oes"],    s: "The bus goes fast." },
      { w: "green",  p: ["gr", "een"],   s: "Grass is green." },
      { w: "its",    p: ["it", "s"],     s: "The dog wagged its tail." },
      { w: "made",   p: ["m", "ade"],    s: "I made a card." },
      { w: "many",   p: ["ma", "ny"],    s: "There are many stars." },
      { w: "off",    p: ["o", "ff"],     s: "Turn off the light." },
      { w: "or",     p: ["or"],          s: "Tea or milk?" },
      { w: "pull",   p: ["p", "ull"],    s: "Pull the rope." },
      { w: "read",   p: ["r", "ead"],    s: "I read a book." },
      { w: "right",  p: ["r", "ight"],   s: "Turn right here." },
      { w: "sing",   p: ["s", "ing"],    s: "We sing a song." },
      { w: "sit",    p: ["s", "it"],     s: "Sit on the mat." },
      { w: "sleep",  p: ["sl", "eep"],   s: "I sleep at night." },
      { w: "tell",   p: ["t", "ell"],    s: "Tell me a story." },
      { w: "their",  p: ["th", "eir"],   s: "It is their turn." },
      { w: "these",  p: ["th", "ese"],   s: "These are mine." },
      { w: "those",  p: ["th", "ose"],   s: "Those are yours." },
      { w: "upon",   p: ["u", "pon"],    s: "Once upon a time." },
      { w: "us",     p: ["us"],          s: "Come with us." },
      { w: "use",    p: ["u", "se"],     s: "Use a spoon." },
      { w: "very",   p: ["ve", "ry"],    s: "It is very hot." },
      { w: "wash",   p: ["w", "ash"],    s: "Wash your hands." },
      { w: "which",  p: ["wh", "ich"],   s: "Which one is red?" },
      { w: "why",    p: ["wh", "y"],     s: "Why is it wet?" },
      { w: "wish",   p: ["w", "ish"],    s: "I wish for snow." },
      { w: "work",   p: ["w", "ork"],    s: "We work as a team." },
      { w: "would",  p: ["w", "ould"],   s: "Would you like tea?" },
      { w: "write",  p: ["wr", "ite"],   s: "Write your name." },
      { w: "your",   p: ["y", "our"],    s: "Is this your hat?" }
    ],
    3: [
      { w: "about",  p: ["a", "bout"],   s: "Tell me about it." },
      { w: "better", p: ["bet", "ter"],  s: "I feel better now." },
      { w: "bring",  p: ["br", "ing"],   s: "Bring your lunch." },
      { w: "carry",  p: ["car", "ry"],   s: "Carry the bag." },
      { w: "clean",  p: ["cl", "ean"],   s: "Keep your room clean." },
      { w: "cut",    p: ["c", "ut"],     s: "Cut the paper." },
      { w: "done",   p: ["d", "one"],    s: "My work is done." },
      { w: "draw",   p: ["dr", "aw"],    s: "I draw a sun." },
      { w: "drink",  p: ["dr", "ink"],   s: "Drink your water." },
      { w: "eight",  p: ["eigh", "t"],   s: "I am eight years old." },
      { w: "fall",   p: ["f", "all"],    s: "Leaves fall down." },
      { w: "far",    p: ["f", "ar"],     s: "The moon is far." },
      { w: "full",   p: ["f", "ull"],    s: "My cup is full." },
      { w: "got",    p: ["g", "ot"],     s: "I got a gift." },
      { w: "grow",   p: ["gr", "ow"],    s: "Plants grow tall." },
      { w: "hold",   p: ["h", "old"],    s: "Hold my hand." },
      { w: "hot",    p: ["h", "ot"],     s: "The soup is hot." },
      { w: "hurt",   p: ["h", "urt"],    s: "I hurt my knee." },
      { w: "if",     p: ["if"],          s: "If it rains, we stay." },
      { w: "keep",   p: ["k", "eep"],    s: "Keep it safe." },
      { w: "kind",   p: ["k", "ind"],    s: "Be kind to all." },
      { w: "laugh",  p: ["l", "augh"],   s: "We laugh a lot." },
      { w: "light",  p: ["l", "ight"],   s: "The light is bright." },
      { w: "long",   p: ["l", "ong"],    s: "A long, long road." },
      { w: "much",   p: ["m", "uch"],    s: "Thank you so much." },
      { w: "myself", p: ["my", "self"],  s: "I did it myself." },
      { w: "never",  p: ["nev", "er"],   s: "I never give up." },
      { w: "only",   p: ["on", "ly"],    s: "Only one is left." },
      { w: "own",    p: ["o", "wn"],     s: "It is my own." },
      { w: "pick",   p: ["p", "ick"],    s: "Pick a card." },
      { w: "seven",  p: ["sev", "en"],   s: "I see seven ducks." },
      { w: "shall",  p: ["sh", "all"],   s: "Shall we go?" },
      { w: "show",   p: ["sh", "ow"],    s: "Show me your art." },
      { w: "six",    p: ["s", "ix"],     s: "I have six crayons." },
      { w: "small",  p: ["sm", "all"],   s: "A small mouse." },
      { w: "start",  p: ["st", "art"],   s: "Let's start now." },
      { w: "ten",    p: ["t", "en"],     s: "I count to ten." },
      { w: "today",  p: ["to", "day"],   s: "Today is sunny." },
      { w: "together",p:["to","geth","er"], s: "We play together." },
      { w: "try",    p: ["tr", "y"],     s: "Try your best." },
      { w: "warm",   p: ["w", "arm"],    s: "The sun is warm." }
    ],
    4: [
      { w: "believe", p: ["be", "lieve"], s: "I believe in you." },
      { w: "brought", p: ["br", "ought"], s: "I brought a snack." },
      { w: "children",p: ["chil", "dren"],s: "The children play." },
      { w: "different",p:["dif","fer","ent"],s:"We are all different." },
      { w: "enough",  p: ["e", "nough"],  s: "That is enough." },
      { w: "important",p:["im","por","tant"],s:"Sleep is important." },
      { w: "learn",   p: ["l", "earn"],   s: "We learn new words." },
      { w: "money",   p: ["mon", "ey"],   s: "I saved my money." },
      { w: "morning", p: ["morn", "ing"], s: "Good morning!" },
      { w: "father",  p: ["fa", "ther"],  s: "My father is tall." },
      { w: "mother",  p: ["mo", "ther"],  s: "My mother sings." },
      { w: "answer",  p: ["an", "swer"],  s: "I know the answer." },
      { w: "beautiful",p:["beau","ti","ful"],s:"What a beautiful day." },
      { w: "country", p: ["coun", "try"], s: "I love my country." },
      { w: "friend",  p: ["fr", "iend"],  s: "You are my friend." },
      { w: "great",   p: ["gr", "eat"],   s: "You did a great job." },
      { w: "ground",  p: ["gr", "ound"],  s: "Seeds are in the ground." },
      { w: "happy",   p: ["hap", "py"],   s: "I feel so happy." },
      { w: "heard",   p: ["h", "eard"],   s: "I heard a bird." },
      { w: "large",   p: ["l", "arge"],   s: "A large elephant." },
      { w: "listen",  p: ["lis", "ten"],  s: "Please listen well." },
      { w: "number",  p: ["num", "ber"],  s: "Pick a number." },
      { w: "often",   p: ["of", "ten"],   s: "We often visit." },
      { w: "people",  p: ["peo", "ple"],  s: "Kind people help." },
      { w: "picture", p: ["pic", "ture"], s: "I drew a picture." },
      { w: "quickly", p: ["quick", "ly"], s: "Run quickly!" },
      { w: "really",  p: ["real", "ly"],  s: "I really like it." },
      { w: "second",  p: ["sec", "ond"],  s: "Wait one second." },
      { w: "should",  p: ["sh", "ould"],  s: "We should share." },
      { w: "special", p: ["spe", "cial"], s: "You are special." },
      { w: "story",   p: ["sto", "ry"],   s: "Read me a story." },
      { w: "thought", p: ["th", "ought"], s: "I thought about you." },
      { w: "through", p: ["thr", "ough"], s: "Walk through the door." },
      { w: "together",p: ["to","geth","er"], s: "We stand together." },
      { w: "world",   p: ["w", "orld"],   s: "It's a big world." },
      { w: "young",   p: ["y", "oung"],   s: "The young pup runs." }
    ]
  };

  // Remove any accidental placeholder rows (defensive cleanup)
  Object.keys(WORDS).forEach(function (g) {
    WORDS[g] = WORDS[g].filter(function (item) {
      return /^[a-z'\- ]+$/i.test(item.w) && item.s;
    });
  });

  /* ==========================================================
     2. STATE
     ========================================================== */
  const state = {
    list: [],          // active word objects for this session
    index: 0,          // current position
    levelLabel: "",    // e.g. "Std 1" or "Mix All"
    slow: false        // slow-speech toggle
  };

  const SLOW_RATE = 0.55;
  const NORMAL_RATE = 0.85;

  /* ==========================================================
     3. localStorage progress  (mastery per word)
     ========================================================== */
  const STORE_KEY = "sightword-journey-v1";
  let progress = loadProgress();

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveProgress() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(progress));
    } catch (e) { /* storage may be unavailable; fail quietly */ }
  }
  function getMastery(word) {
    return progress[word] || 0; // 0..3 stars
  }
  function bumpMastery(word) {
    progress[word] = Math.min(3, getMastery(word) + 1);
    saveProgress();
  }

  /* ==========================================================
     4. DOM references
     ========================================================== */
  const $ = function (sel) { return document.querySelector(sel); };

  const homeScreen   = $("#homeScreen");
  const learnScreen  = $("#learnScreen");
  const finishScreen = $("#finishScreen");
  const screens      = [homeScreen, learnScreen, finishScreen];

  const homeBtn      = $("#homeBtn");
  const themeBtn     = $("#themeBtn");

  const wordCard     = $("#wordCard");
  const wordDisplay  = $("#wordDisplay");
  const phonicsParts = $("#phonicsParts");
  const wordSentence = $("#wordSentence");
  const masteryStars = $("#masteryStars");

  const progressLabel= $("#progressLabel");
  const progressLevel= $("#progressLevel");
  const progressFill = $("#progressFill");
  const progressBarEl= $("#progressBarEl");

  const listenBtn    = $("#listenBtn");
  const slowBtn      = $("#slowBtn");
  const phonicsBtn   = $("#phonicsBtn");
  const knowBtn      = $("#knowBtn");
  const prevBtn      = $("#prevBtn");
  const nextBtn      = $("#nextBtn");
  const repeatBtn    = $("#repeatBtn");

  const finishText   = $("#finishText");
  const againBtn     = $("#againBtn");
  const finishHomeBtn= $("#finishHomeBtn");

  const liveRegion   = $("#liveRegion");
  const overallProgress = $("#overallProgress");

  /* ==========================================================
     5. Screen switching
     ========================================================== */
  function showScreen(el) {
    screens.forEach(function (s) {
      const isActive = s === el;
      s.classList.toggle("active", isActive);
      s.hidden = !isActive;
    });
    homeBtn.hidden = (el === homeScreen);
    // scroll to top for a fresh view
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ==========================================================
     6. Building a session
     ========================================================== */
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startSession(grade, doShuffle) {
    let list = [];
    let label = "";

    if (grade === "all") {
      Object.keys(WORDS).forEach(function (g) { list = list.concat(WORDS[g]); });
      label = doShuffle ? "Random Practice" : "Mix All Grades";
    } else {
      list = WORDS[grade].slice();
      label = "Std " + grade;
    }

    if (doShuffle) list = shuffle(list);

    state.list = list;
    state.index = 0;
    state.levelLabel = label;

    showScreen(learnScreen);
    renderWord();
  }

  /* ==========================================================
     7. Rendering a word
     ========================================================== */
  function current() { return state.list[state.index]; }

  function renderWord() {
    cancelSpeech();
    const item = current();
    if (!item) return;

    // Word text
    wordDisplay.textContent = item.w;

    // Phonics parts (hidden until "Sound It Out" is used, but pre-built)
    phonicsParts.innerHTML = "";
    (item.p && item.p.length ? item.p : [item.w]).forEach(function (part) {
      const span = document.createElement("span");
      span.className = "phonics-part";
      span.textContent = part;
      phonicsParts.appendChild(span);
    });
    phonicsParts.classList.remove("show");
    phonicsParts.setAttribute("aria-hidden", "true");

    // Example sentence with the word highlighted
    renderSentence(item);

    // Mastery stars
    renderStars(getMastery(item.w));

    // Progress
    updateProgress();

    // Pop animation
    wordCard.classList.remove("pop");
    void wordCard.offsetWidth; // reflow to restart animation
    wordCard.classList.add("pop");

    // Enable/disable prev
    prevBtn.disabled = state.index === 0;

    // Announce for screen readers
    announce(item.w);

    // Auto-say the word gently on arrival
    speakWord(item.w, false);
  }

  function renderSentence(item) {
    wordSentence.innerHTML = "";
    if (!item.s) return;
    // Highlight the target word (case-insensitive, whole-ish word)
    const re = new RegExp("(" + item.w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "i");
    const parts = item.s.split(re);
    parts.forEach(function (chunk) {
      if (chunk.toLowerCase() === item.w.toLowerCase()) {
        const b = document.createElement("span");
        b.className = "hl";
        b.textContent = chunk;
        wordSentence.appendChild(b);
      } else {
        wordSentence.appendChild(document.createTextNode(chunk));
      }
    });
  }

  function renderStars(count) {
    masteryStars.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const s = document.createElement("span");
      s.className = "star" + (i < count ? " filled" : "");
      s.textContent = "★";
      s.setAttribute("aria-hidden", "true");
      masteryStars.appendChild(s);
    }
    masteryStars.setAttribute(
      "aria-label",
      "Mastery: " + count + " of 3 stars"
    );
  }

  function updateProgress() {
    const total = state.list.length;
    const pos = state.index + 1;
    const pct = total ? Math.round((pos / total) * 100) : 0;
    progressLabel.textContent = "Word " + pos + " of " + total;
    progressLevel.textContent = state.levelLabel;
    progressFill.style.width = pct + "%";
    progressBarEl.setAttribute("aria-valuenow", String(pct));
  }

  /* ==========================================================
     8. Web Speech API
     ========================================================== */
  const synth = window.speechSynthesis;
  let voices = [];

  function loadVoices() {
    if (!synth) return;
    voices = synth.getVoices();
  }
  if (synth) {
    loadVoices();
    if (typeof synth.onvoiceschanged !== "undefined") {
      synth.onvoiceschanged = loadVoices;
    }
  }

  // Prefer a clear English voice; nudge toward friendlier ones if present.
  function pickVoice() {
    if (!voices.length) loadVoices();
    if (!voices.length) return null;
    const prefs = [
      "Google UK English Female",
      "Google US English",
      "Samantha",
      "Karen",
      "Microsoft Zira",
      "Microsoft Aria"
    ];
    for (const name of prefs) {
      const v = voices.find(function (vv) { return vv.name === name; });
      if (v) return v;
    }
    // Any en-* voice, prefer female-sounding as a gentle default
    return voices.find(function (v) { return /^en/i.test(v.lang); }) || voices[0];
  }

  function cancelSpeech() {
    if (synth && synth.speaking) synth.cancel();
    clearHighlights();
    listenBtn.classList.remove("speaking");
    phonicsBtn.classList.remove("speaking");
  }

  function speakWord(text, forceSlow) {
    if (!synth) { warnNoSpeech(); return; }
    synth.cancel();
    clearHighlights();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || "en-US";
    u.rate = (forceSlow || state.slow) ? SLOW_RATE : NORMAL_RATE;
    u.pitch = 1.15; // slightly higher = friendlier for kids
    listenBtn.classList.add("speaking");
    u.onend = u.onerror = function () { listenBtn.classList.remove("speaking"); };
    synth.speak(u);
  }

  /* ---- Phonics: speak each part in sequence, highlighting it ---- */
  function clearHighlights() {
    const parts = phonicsParts.querySelectorAll(".phonics-part");
    parts.forEach(function (p) { p.classList.remove("active"); });
  }

  function soundItOut() {
    const item = current();
    if (!item) return;
    if (!synth) { warnNoSpeech(); return; }

    synth.cancel();
    // Reveal phonics row
    phonicsParts.classList.add("show");
    phonicsParts.setAttribute("aria-hidden", "false");
    clearHighlights();

    const spans = Array.prototype.slice.call(
      phonicsParts.querySelectorAll(".phonics-part")
    );
    const partsText = (item.p && item.p.length) ? item.p : [item.w];

    phonicsBtn.classList.add("speaking");

    let i = 0;
    function speakPart() {
      if (i >= partsText.length) {
        // Finally, say the whole word smoothly
        clearHighlights();
        const whole = new SpeechSynthesisUtterance(item.w);
        const v = pickVoice();
        if (v) { whole.voice = v; whole.lang = v.lang; }
        whole.rate = NORMAL_RATE;
        whole.pitch = 1.15;
        whole.onend = whole.onerror = function () {
          phonicsBtn.classList.remove("speaking");
        };
        // highlight the whole word by lighting all parts briefly
        spans.forEach(function (s) { s.classList.add("active"); });
        whole.onend = function () {
          spans.forEach(function (s) { s.classList.remove("active"); });
          phonicsBtn.classList.remove("speaking");
        };
        synth.speak(whole);
        return;
      }

      clearHighlights();
      if (spans[i]) spans[i].classList.add("active");

      const u = new SpeechSynthesisUtterance(partsText[i]);
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; }
      u.rate = SLOW_RATE;      // always slow for sounding out
      u.pitch = 1.15;
      u.onend = function () {
        i++;
        // small pause between parts so kids can follow
        setTimeout(speakPart, 260);
      };
      u.onerror = function () {
        i++;
        setTimeout(speakPart, 260);
      };
      synth.speak(u);
    }
    speakPart();
  }

  let warnedNoSpeech = false;
  function warnNoSpeech() {
    if (warnedNoSpeech) return;
    warnedNoSpeech = true;
    announce("Sorry, sound is not available on this device.");
  }

  /* ==========================================================
     9. Navigation
     ========================================================== */
  function next() {
    if (state.index < state.list.length - 1) {
      state.index++;
      renderWord();
    } else {
      finishSession();
    }
  }
  function prev() {
    if (state.index > 0) {
      state.index--;
      renderWord();
    }
  }
  function knowThis() {
    const item = current();
    if (item) bumpMastery(item.w);
    renderStars(getMastery(item.w));
    celebrate();
    announce("Great! You know " + item.w);
    // gentle delay so the confetti is enjoyed before moving on
    setTimeout(next, 750);
  }

  function finishSession() {
    cancelSpeech();
    const total = state.list.length;
    let mastered = 0;
    state.list.forEach(function (it) {
      if (getMastery(it.w) > 0) mastered++;
    });
    finishText.textContent =
      "You practiced " + total + " words in " + state.levelLabel +
      ". You marked " + mastered + " as known. Keep it up!";
    showScreen(finishScreen);
    bigCelebrate();
    updateOverall();
  }

  /* ==========================================================
     10. Announcements (screen readers)
     ========================================================== */
  function announce(msg) {
    liveRegion.textContent = "";
    // slight delay ensures re-announcement of same text
    setTimeout(function () { liveRegion.textContent = msg; }, 30);
  }

  /* ==========================================================
     11. Overall progress on home screen
     ========================================================== */
  function updateOverall() {
    const total = Object.keys(WORDS).reduce(function (n, g) {
      return n + WORDS[g].length;
    }, 0);
    const known = Object.keys(progress).filter(function (w) {
      return progress[w] > 0;
    }).length;
    if (known > 0) {
      overallProgress.textContent =
        "⭐ You've started " + known + " of " + total + " words!";
    } else {
      overallProgress.textContent = "";
    }
  }

  /* ==========================================================
     12. Confetti (lightweight canvas, no libs)
     ========================================================== */
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  let confetti = [];
  let confettiRAF = null;

  function sizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", sizeCanvas);
  sizeCanvas();

  const CONFETTI_COLORS = ["#f4c95d", "#f08a7d", "#a7c4a0", "#bcd9e6", "#e26a5b"];

  function spawnConfetti(count) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < count; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.3,
        r: 5 + Math.random() * 7,
        c: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        vx: -2 + Math.random() * 4,
        vy: 2 + Math.random() * 4,
        rot: Math.random() * Math.PI,
        vr: -0.2 + Math.random() * 0.4,
        life: 90 + Math.random() * 40
      });
    }
    if (!confettiRAF) confettiRAF = requestAnimationFrame(tickConfetti);
  }

  function tickConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti = confetti.filter(function (p) { return p.life > 0 && p.y < canvas.height + 30; });
    confetti.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06; // gravity
      p.rot += p.vr;
      p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.c;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 30));
      ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      ctx.restore();
    });
    if (confetti.length) {
      confettiRAF = requestAnimationFrame(tickConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiRAF = null;
    }
  }

  function celebrate() { spawnConfetti(40); }
  function bigCelebrate() { spawnConfetti(140); }

  /* ==========================================================
     13. Theme (dark / light) with persistence
     ========================================================== */
  const THEME_KEY = "sightword-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    themeBtn.querySelector(".theme-icon").textContent = theme === "dark" ? "☀️" : "🌙";
    themeBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) {
      saved = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(saved);
  }
  themeBtn.addEventListener("click", function () {
    const cur = document.documentElement.getAttribute("data-theme");
    const nxt = cur === "dark" ? "light" : "dark";
    applyTheme(nxt);
    try { localStorage.setItem(THEME_KEY, nxt); } catch (e) {}
  });

  /* ==========================================================
     14. Event wiring
     ========================================================== */
  // Home grade cards + mode buttons
  document.querySelectorAll("[data-grade]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const grade = btn.getAttribute("data-grade");
      const doShuffle = btn.getAttribute("data-shuffle") === "true";
      startSession(grade === "all" ? "all" : Number(grade), doShuffle);
    });
  });

  // Word counts on cards
  document.querySelectorAll("[data-count]").forEach(function (el) {
    const g = el.getAttribute("data-count");
    el.textContent = WORDS[g].length + " words";
  });

  listenBtn.addEventListener("click", function () { speakWord(current().w, false); });
  phonicsBtn.addEventListener("click", soundItOut);
  repeatBtn.addEventListener("click", function () { speakWord(current().w, false); });

  slowBtn.addEventListener("click", function () {
    state.slow = !state.slow;
    slowBtn.classList.toggle("speaking", state.slow);
    slowBtn.setAttribute("aria-pressed", String(state.slow));
    announce(state.slow ? "Slow mode on" : "Slow mode off");
    speakWord(current().w, false);
  });

  knowBtn.addEventListener("click", knowThis);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  homeBtn.addEventListener("click", function () {
    cancelSpeech();
    updateOverall();
    showScreen(homeScreen);
  });
  finishHomeBtn.addEventListener("click", function () {
    updateOverall();
    showScreen(homeScreen);
  });
  againBtn.addEventListener("click", function () {
    state.index = 0;
    showScreen(learnScreen);
    renderWord();
  });

  // Keyboard support on the learning screen
  document.addEventListener("keydown", function (e) {
    if (learnScreen.hidden) return;
    switch (e.key) {
      case "ArrowRight": next(); break;
      case "ArrowLeft": prev(); break;
      case " ": // space = listen
      case "Enter":
        if (document.activeElement === document.body) {
          e.preventDefault();
          speakWord(current().w, false);
        }
        break;
      case "p": case "P": soundItOut(); break;
    }
  });

  // Stop speech if the tab is hidden
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancelSpeech();
  });

  /* ==========================================================
     15. Service worker (offline) — optional, best-effort
     ========================================================== */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        /* offline caching unavailable (e.g. file://) — app still works */
      });
    });
  }

  /* ==========================================================
     16. Init
     ========================================================== */
  initTheme();
  updateOverall();
  showScreen(homeScreen);

})();
