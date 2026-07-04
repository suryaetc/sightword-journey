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

  /* ----------------------------------------------------------
     Named groups within Std 1 (shown as their own sections):
       - Math / concept words
       - Number names (one..twenty, then tens to one hundred)
     ---------------------------------------------------------- */

  // These Std-1 words form the dedicated "Math Words" section
  // (pulled out of the alphabetical sections so they group together).
  const MATH_WORD_NAMES = [
    "add", "match", "less", "digit", "object", "number", "plus", "subtract",
    "place", "value", "zero", "use", "than", "sort", "compare", "similar",
    "after", "before", "near", "equal", "different", "alike", "input",
    "output", "rule"
  ];

  // Number names — their own section. Words with phonics splits + sentences.
  const NUMBER_WORDS = [
    { w: "one",       p: ["o", "ne"],       s: "I have one dog." },
    { w: "two",       p: ["tw", "o"],       s: "I see two cats." },
    { w: "three",     p: ["thr", "ee"],     s: "Three little pigs." },
    { w: "four",      p: ["f", "our"],      s: "A car has four wheels." },
    { w: "five",      p: ["f", "ive"],      s: "Give me five!" },
    { w: "six",       p: ["s", "ix"],       s: "A bug has six legs." },
    { w: "seven",     p: ["sev", "en"],     s: "Seven days in a week." },
    { w: "eight",     p: ["eigh", "t"],     s: "A spider has eight legs." },
    { w: "nine",      p: ["n", "ine"],      s: "Nine is almost ten." },
    { w: "ten",       p: ["t", "en"],       s: "Ten fingers and toes." },
    { w: "eleven",    p: ["e", "lev", "en"],s: "Eleven players on a team." },
    { w: "twelve",    p: ["tw", "elve"],    s: "Twelve months in a year." },
    { w: "thirteen",  p: ["thir", "teen"],  s: "Thirteen is a big number." },
    { w: "fourteen",  p: ["four", "teen"],  s: "Fourteen days is two weeks." },
    { w: "fifteen",   p: ["fif", "teen"],   s: "Fifteen minutes to play." },
    { w: "sixteen",   p: ["six", "teen"],   s: "Sixteen crayons in the box." },
    { w: "seventeen", p: ["seven", "teen"], s: "Seventeen is more than ten." },
    { w: "eighteen",  p: ["eigh", "teen"],  s: "Eighteen candles on a cake." },
    { w: "nineteen",  p: ["nine", "teen"],  s: "Nineteen comes before twenty." },
    { w: "twenty",    p: ["twen", "ty"],    s: "Twenty toes in the room." },
    { w: "thirty",    p: ["thir", "ty"],    s: "Thirty days in June." },
    { w: "forty",     p: ["for", "ty"],     s: "Forty winks means a nap." },
    { w: "fifty",     p: ["fif", "ty"],     s: "Fifty stars on the flag." },
    { w: "sixty",     p: ["six", "ty"],     s: "Sixty seconds in a minute." },
    { w: "seventy",   p: ["seven", "ty"],   s: "Seventy is a big age." },
    { w: "eighty",    p: ["eigh", "ty"],    s: "Eighty is near a hundred." },
    { w: "ninety",    p: ["nine", "ty"],    s: "Ninety comes after eighty." },
    { w: "hundred",   p: ["hun", "dred"],   s: "One hundred cents in a dollar." }
  ];

  /* ==========================================================
     2. STATE
     ========================================================== */
  const state = {
    list: [],          // active word objects for this session
    index: 0,          // current position
    levelLabel: "",    // e.g. "Std 1" or "Mix All"
    slow: false        // slow-speech toggle
  };

  const SLOW_RATE = 0.7;    // "Slow" button + sounding out (still clearly slow)
  const NORMAL_RATE = 0.95; // Listen / Say sentence (near-natural pace)

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

  const chooseScreen = $("#chooseScreen");
  const homeScreen   = $("#homeScreen");
  const sectionScreen= $("#sectionScreen");
  const learnScreen  = $("#learnScreen");
  const finishScreen = $("#finishScreen");
  const mathsChapterScreen = $("#mathsChapterScreen");
  const mathsSectionScreen = $("#mathsSectionScreen");
  const quizScreen   = $("#quizScreen");
  const quizResultScreen = $("#quizResultScreen");
  const screens      = [chooseScreen, homeScreen, sectionScreen, learnScreen,
                        finishScreen, mathsChapterScreen, mathsSectionScreen,
                        quizScreen, quizResultScreen];

  const sectionHeading  = $("#sectionHeading");
  const sectionSubtitle = $("#sectionSubtitle");
  const sectionGrid     = $("#sectionGrid");
  const sectionShuffleBtn = $("#sectionShuffleBtn");
  const sectionAllBtn     = $("#sectionAllBtn");

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
  const saySentenceBtn = $("#saySentenceBtn");
  const knowBtn      = $("#knowBtn");
  const prevBtn      = $("#prevBtn");
  const nextBtn      = $("#nextBtn");

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
    homeBtn.hidden = (el === chooseScreen);
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

  // Words of a grade, sorted alphabetically (used for sections).
  function sortedGrade(grade) {
    return WORDS[grade].slice().sort(function (a, b) {
      return a.w.localeCompare(b.w);
    });
  }

  // All words across grades (grade order preserved).
  function allWords() {
    let list = [];
    Object.keys(WORDS).forEach(function (g) { list = list.concat(WORDS[g]); });
    return list;
  }

  // Split a list of word objects into fixed-size chunks.
  const SECTION_SIZE = 12;
  function chunk(words) {
    const sections = [];
    for (let i = 0; i < words.length; i += SECTION_SIZE) {
      sections.push(words.slice(i, i + SECTION_SIZE));
    }
    return sections;
  }

  // The grade the section screen is currently showing.
  let currentGrade = null;

  // Create one section card and append it to the grid.
  function addSectionCard(opts) {
    const btn = document.createElement("button");
    btn.className = "section-card" + (opts.featured ? " section-card-featured" : "");
    btn.setAttribute("role", "listitem");
    btn.innerHTML =
      '<span class="section-num">' + opts.tag + "</span>" +
      '<span class="section-range">' + opts.title + "</span>" +
      '<span class="section-meta">' + opts.words.length + " words</span>";
    btn.addEventListener("click", function () {
      // Words within a section play in a fresh random order each time.
      beginSession(shuffle(opts.words), opts.label);
    });
    sectionGrid.appendChild(btn);
  }

  // Open the section-picker screen for a grade.
  function openGrade(grade) {
    currentGrade = grade;
    sectionHeading.textContent = "Std " + grade;
    sectionGrid.innerHTML = "";

    // Regular sight words for this grade, alphabetically.
    let regular = sortedGrade(grade);

    // Std 1 gets two dedicated, featured sections up top:
    //   Number Names, then Math Words (removed from the plain sections).
    if (grade === 1) {
      const mathSet = {};
      MATH_WORD_NAMES.forEach(function (n) { mathSet[n] = true; });
      const mathWords = regular.filter(function (it) { return mathSet[it.w]; });
      regular = regular.filter(function (it) { return !mathSet[it.w]; });

      addSectionCard({
        tag: "🔢 Numbers", title: "one – hundred",
        words: NUMBER_WORDS, label: "Std 1 · Number Names", featured: true
      });
      addSectionCard({
        tag: "➕ Math Words", title: "add – rule",
        words: mathWords, label: "Std 1 · Math Words", featured: true
      });
    }

    sectionSubtitle.textContent =
      "Pick a section, or practice all " + regular.length + " sight words.";

    // Alphabetical sections of the remaining sight words.
    chunk(regular).forEach(function (sec, i) {
      const first = sec[0].w;
      const last = sec[sec.length - 1].w;
      addSectionCard({
        tag: "Section " + (i + 1), title: first + " – " + last,
        words: sec, label: "Std " + grade + " · " + first + "–" + last
      });
    });

    showScreen(sectionScreen);
  }

  // Start a learning session from a prepared list of words.
  function beginSession(list, label) {
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

    // Announce for screen readers (silent text label, not audio)
    announce(item.w);
    // Note: the word is NOT spoken automatically. It plays only when the
    // child presses Listen, Slow, Repeat, or Sound It Out.
  }

  function renderSentence(item) {
    wordSentence.innerHTML = "";
    if (!item.s) return;
    // Wrap EACH word in its own span, recording its character offset in the
    // sentence. The offset lets us light up the matching word during speech
    // (via SpeechSynthesis onboundary). The target word keeps its coral tint.
    const s = item.s;
    const wordRe = /[A-Za-z']+/g;
    let last = 0, m;
    while ((m = wordRe.exec(s)) !== null) {
      if (m.index > last) {
        wordSentence.appendChild(document.createTextNode(s.slice(last, m.index)));
      }
      const span = document.createElement("span");
      span.className = "sentence-word";
      if (m[0].toLowerCase() === item.w.toLowerCase()) span.classList.add("hl");
      span.dataset.start = String(m.index);
      span.textContent = m[0];
      wordSentence.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < s.length) {
      wordSentence.appendChild(document.createTextNode(s.slice(last)));
    }
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

  /* ----------------------------------------------------------
     Pre-generated audio clips (Google WaveNet / Chirp voice).
     A build step creates one MP3 per word / sentence / question
     and an audio/manifest.json mapping the exact text -> file.
     At runtime we play the MP3 when present, and fall back to
     the device's Web Speech voice when it isn't (so the app keeps
     working before the clips are generated, and offline for any
     text without a clip).
     ---------------------------------------------------------- */
  let clipManifest = {};
  (function loadClipManifest() {
    try {
      fetch("audio/manifest.json", { cache: "no-cache" })
        .then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (j) { clipManifest = j || {}; })
        .catch(function () { /* no clips yet — use Web Speech */ });
    } catch (e) { /* ignore */ }
  })();

  function clipUrlFor(text) {
    const f = clipManifest[(text == null ? "" : String(text)).trim()];
    return f ? ("audio/" + f + ".mp3") : null;
  }
  function allClips(texts) {
    for (let i = 0; i < texts.length; i++) { if (!clipUrlFor(texts[i])) return false; }
    return true;
  }

  let currentAudio = null;
  function stopAudio() {
    if (currentAudio) {
      try { currentAudio.pause(); } catch (e) {}
      currentAudio.onended = currentAudio.onerror = currentAudio.onloadedmetadata = null;
      currentAudio = null;
    }
  }

  // Play one clip. Optionally light up each word span across the clip's
  // real duration (so the underline / karaoke keeps working with recorded
  // audio). opts: { rate, btn, spans, total, onWord, onEnd, fallback }
  function playClip(url, opts) {
    opts = opts || {};
    stopAudio();
    if (synth && synth.speaking) synth.cancel();
    const a = new Audio(url);
    currentAudio = a;
    a.playbackRate = opts.rate || 1;
    try { a.preservesPitch = a.mozPreservesPitch = a.webkitPreservesPitch = true; } catch (e) {}
    let timers = [];
    function clearT() { timers.forEach(clearTimeout); timers = []; }
    if (opts.btn) opts.btn.classList.add("speaking");
    if (opts.spans && opts.spans.length && opts.onWord) {
      a.onloadedmetadata = function () {
        let durMs = (a.duration / (opts.rate || 1)) * 1000;
        if (!isFinite(durMs) || durMs <= 0) durMs = 1600;
        const total = opts.total || 1;
        opts.spans.forEach(function (sp) {
          const frac = (+sp.dataset.start) / total;
          timers.push(setTimeout(function () { opts.onWord(sp); }, Math.round(frac * durMs)));
        });
      };
    }
    a.onended = function () {
      clearT();
      if (opts.btn) opts.btn.classList.remove("speaking");
      if (opts.onEnd) opts.onEnd();
      currentAudio = null;
    };
    a.onerror = function () {
      clearT();
      if (opts.btn) opts.btn.classList.remove("speaking");
      currentAudio = null;
      if (opts.fallback) opts.fallback();
    };
    const p = a.play();
    if (p && p.catch) p.catch(function () {
      clearT();
      if (opts.btn) opts.btn.classList.remove("speaking");
      currentAudio = null;
      if (opts.fallback) opts.fallback();
    });
  }

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
  // Score each available voice and pick the most natural English one.
  // Modern devices ship higher-quality "neural/natural" voices under
  // various names; we rank those highest and avoid the robotic "compact"
  // / eSpeak fallbacks. The result is cached until the voice list changes.
  let cachedVoice = null;
  let cachedVoiceCount = -1;

  function scoreVoice(v) {
    const name = (v.name || "").toLowerCase();
    const lang = (v.lang || "").toLowerCase();
    let score = 0;

    // Must be English to pronounce sight words correctly.
    if (/^en/.test(lang)) score += 40; else score -= 100;
    if (lang === "en-us" || lang === "en-gb") score += 8;

    // Quality markers found in modern neural/natural voice names.
    if (/natural|neural|online/.test(name)) score += 40;
    if (/enhanced|premium/.test(name)) score += 30;

    // Known good, pleasant voices across platforms.
    if (/\bgoogle\b/.test(name)) score += 25;               // Chrome/Android
    if (/samantha|karen|moira|serena|allison|ava|nicky/.test(name)) score += 18; // Apple
    if (/aria|jenny|guy|libby|sonia|natasha/.test(name)) score += 18; // MS neural

    // Penalise known low-quality / robotic engines.
    if (/compact|eloquence|espeak|festival|pico/.test(name)) score -= 40;

    // A gentle nudge toward warmer default voices for young children.
    if (/female|woman|samantha|aria|jenny|libby|sonia|karen/.test(name)) score += 4;

    return score;
  }

  function pickVoice() {
    if (!voices.length) loadVoices();
    if (!voices.length) return null;
    // Reuse the last choice unless the voice list has changed.
    if (cachedVoice && cachedVoiceCount === voices.length) return cachedVoice;

    let best = null, bestScore = -Infinity;
    voices.forEach(function (v) {
      const s = scoreVoice(v);
      if (s > bestScore) { bestScore = s; best = v; }
    });
    cachedVoice = best || voices[0];
    cachedVoiceCount = voices.length;
    return cachedVoice;
  }

  function cancelSpeech() {
    stopAudio();
    if (synth && synth.speaking) synth.cancel();
    clearHighlights();
    clearSentenceHighlight();
    clearSentenceTimers();
    listenBtn.classList.remove("speaking");
    phonicsBtn.classList.remove("speaking");
    saySentenceBtn.classList.remove("speaking");
  }

  function speakWord(text, forceSlow) {
    const slow = !!(forceSlow || state.slow);
    const url = clipUrlFor(text);
    if (url) {
      playClip(url, {
        rate: slow ? 0.82 : 1, btn: listenBtn,
        fallback: function () { ttsSpeakWord(text, slow); }
      });
      return;
    }
    ttsSpeakWord(text, slow);
  }

  function ttsSpeakWord(text, slow) {
    if (!synth) { warnNoSpeech(); return; }
    synth.cancel();
    clearHighlights();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || "en-US";
    u.rate = slow ? SLOW_RATE : NORMAL_RATE;
    u.pitch = 1.05; // slightly higher = friendlier for kids
    listenBtn.classList.add("speaking");
    u.onend = u.onerror = function () { listenBtn.classList.remove("speaking"); };
    synth.speak(u);
  }

  // Remove the karaoke highlight from every sentence word.
  function clearSentenceHighlight() {
    wordSentence.querySelectorAll(".sentence-word.speaking-word")
      .forEach(function (s) { s.classList.remove("speaking-word"); });
  }

  let sentenceTimers = [];
  function clearSentenceTimers() {
    sentenceTimers.forEach(clearTimeout);
    sentenceTimers = [];
  }

  function highlightSentenceSpan(sp) {
    clearSentenceHighlight();
    if (sp) sp.classList.add("speaking-word");
  }

  // Speak the whole example sentence, highlighting each word as it is read.
  // Two mechanisms keep this working on every device:
  //   1. onboundary events — accurate, used when the TTS engine emits them.
  //   2. a time-based estimate (onstart) — a fallback for the many mobile
  //      engines (Android/iOS) that never fire boundary events. As soon as a
  //      real boundary arrives, the estimated timers are cancelled.
  function speakSentence() {
    const item = current();
    if (!item || !item.s) return;
    clearSentenceHighlight();
    clearSentenceTimers();
    const url = clipUrlFor(item.s);
    if (url) {
      const spans = Array.prototype.slice.call(
        wordSentence.querySelectorAll(".sentence-word")
      );
      playClip(url, {
        rate: state.slow ? 0.82 : 1, btn: saySentenceBtn,
        spans: spans, total: item.s.length || 1,
        onWord: highlightSentenceSpan,
        onEnd: clearSentenceHighlight,
        fallback: ttsSpeakSentence
      });
      return;
    }
    ttsSpeakSentence();
  }

  function ttsSpeakSentence() {
    const item = current();
    if (!item || !item.s) return;
    if (!synth) { warnNoSpeech(); return; }
    synth.cancel();
    clearHighlights();
    clearSentenceHighlight();
    clearSentenceTimers();

    const spans = Array.prototype.slice.call(
      wordSentence.querySelectorAll(".sentence-word")
    );
    const total = item.s.length || 1;

    const u = new SpeechSynthesisUtterance(item.s);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || "en-US";
    u.rate = state.slow ? SLOW_RATE : NORMAL_RATE;
    u.pitch = 1.05;
    saySentenceBtn.classList.add("speaking");

    let usedBoundary = false;

    // (1) Accurate: highlight the word at each spoken boundary.
    u.onboundary = function (e) {
      if (e.name && e.name !== "word") return;
      usedBoundary = true;
      clearSentenceTimers(); // boundaries are exact; drop the estimate
      const idx = e.charIndex;
      let target = null;
      for (let i = 0; i < spans.length; i++) {
        const start = +spans[i].dataset.start;
        const end = start + spans[i].textContent.length;
        if (idx >= start && idx < end) { target = spans[i]; break; }
        if (start <= idx) target = spans[i]; // fallback: last word started
      }
      highlightSentenceSpan(target);
    };

    // (2) Fallback: estimate each word's timing from its position and the
    // speaking rate, and light it up on a timer. Cancelled if boundaries fire.
    u.onstart = function () {
      if (usedBoundary) return;
      const msPerChar = 68 / (u.rate || 1);          // ~natural reading pace
      const totalMs = Math.max(600, total * msPerChar);
      spans.forEach(function (sp) {
        const frac = (+sp.dataset.start) / total;
        const t = setTimeout(function () {
          if (!usedBoundary) highlightSentenceSpan(sp);
        }, Math.round(frac * totalMs));
        sentenceTimers.push(t);
      });
    };

    u.onend = u.onerror = function () {
      clearSentenceTimers();
      saySentenceBtn.classList.remove("speaking");
      clearSentenceHighlight();
    };
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

    const partsText = (item.p && item.p.length) ? item.p : [item.w];
    // Reveal the phonics row so children can see the parts.
    phonicsParts.classList.add("show");
    phonicsParts.setAttribute("aria-hidden", "false");
    clearHighlights();
    const spans = Array.prototype.slice.call(
      phonicsParts.querySelectorAll(".phonics-part")
    );

    // If every part + the whole word has a recorded clip, chain them.
    if (allClips(partsText.concat([item.w]))) {
      stopAudio();
      if (synth && synth.speaking) synth.cancel();
      phonicsBtn.classList.add("speaking");
      let i = 0;
      const playNext = function () {
        if (i >= partsText.length) {
          clearHighlights();
          spans.forEach(function (s) { s.classList.add("active"); });
          playClip(clipUrlFor(item.w), {
            rate: 1,
            onEnd: function () { spans.forEach(function (s) { s.classList.remove("active"); }); phonicsBtn.classList.remove("speaking"); },
            fallback: function () { spans.forEach(function (s) { s.classList.remove("active"); }); phonicsBtn.classList.remove("speaking"); }
          });
          return;
        }
        clearHighlights();
        if (spans[i]) spans[i].classList.add("active");
        playClip(clipUrlFor(partsText[i]), {
          rate: 0.85,
          onEnd: function () { i++; setTimeout(playNext, 240); },
          fallback: function () { i++; setTimeout(playNext, 240); }
        });
      };
      playNext();
      return;
    }
    ttsSoundItOut();
  }

  function ttsSoundItOut() {
    const item = current();
    if (!item) return;
    if (!synth) { warnNoSpeech(); return; }

    synth.cancel();
    // Reveal the phonics row so children can see the parts.
    phonicsParts.classList.add("show");
    phonicsParts.setAttribute("aria-hidden", "false");
    clearHighlights();

    const spans = Array.prototype.slice.call(
      phonicsParts.querySelectorAll(".phonics-part")
    );

    const partsText = (item.p && item.p.length) ? item.p : [item.w];

    phonicsBtn.classList.add("speaking");

    // Speak each part in sequence, highlighting it as it is spoken,
    // then finish by saying the whole word smoothly.
    let i = 0;
    function speakPart() {
      if (i >= partsText.length) {
        clearHighlights();
        const whole = new SpeechSynthesisUtterance(item.w);
        const v = pickVoice();
        if (v) { whole.voice = v; whole.lang = v.lang; }
        whole.rate = NORMAL_RATE;
        whole.pitch = 1.05;
        // Light every part together while the whole word is spoken.
        spans.forEach(function (s) { s.classList.add("active"); });
        whole.onend = function () {
          spans.forEach(function (s) { s.classList.remove("active"); });
          phonicsBtn.classList.remove("speaking");
        };
        whole.onerror = function () {
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
      u.pitch = 1.05;
      u.onend = function () {
        i++;
        setTimeout(speakPart, 260); // small pause so kids can follow
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
  // Home grade cards -> open the section picker for that grade.
  document.querySelectorAll(".grade-card[data-grade]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openGrade(Number(btn.getAttribute("data-grade")));
    });
  });

  // Home mode buttons (all grades): Mix All / Random Practice.
  document.querySelectorAll(".mode-btn[data-grade='all']").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const doShuffle = btn.getAttribute("data-shuffle") === "true";
      const list = doShuffle ? shuffle(allWords()) : allWords();
      beginSession(list, doShuffle ? "Random Practice" : "Mix All Grades");
    });
  });

  // Section screen: Shuffle All / All Words for the chosen grade.
  sectionShuffleBtn.addEventListener("click", function () {
    if (currentGrade == null) return;
    beginSession(shuffle(sortedGrade(currentGrade)), "Std " + currentGrade + " · Random");
  });
  sectionAllBtn.addEventListener("click", function () {
    if (currentGrade == null) return;
    beginSession(sortedGrade(currentGrade), "Std " + currentGrade + " · All");
  });

  // Word counts on cards
  document.querySelectorAll("[data-count]").forEach(function (el) {
    const g = el.getAttribute("data-count");
    el.textContent = WORDS[g].length + " words";
  });

  listenBtn.addEventListener("click", function () { speakWord(current().w, false); });
  phonicsBtn.addEventListener("click", soundItOut);
  saySentenceBtn.addEventListener("click", speakSentence);

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
    stopQuizSpeech();
    updateOverall();
    showScreen(chooseScreen);
  });
  finishHomeBtn.addEventListener("click", function () {
    updateOverall();
    showScreen(chooseScreen);
  });

  // Opening chooser: Sight Words vs Maths Test.
  $("#chooseWordsBtn").addEventListener("click", function () {
    updateOverall();
    showScreen(homeScreen);
  });
  $("#chooseMathsBtn").addEventListener("click", function () {
    openMathsChapters();
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
     16. MATHS TEST MODE
     ----------------------------------------------------------
     A second activity: multiple-choice maths questions grouped
     into chapters and sections. Reuses the shared speech engine
     (pickVoice/synth), confetti, theme and screen switching.
     Many picture questions from the workbook are re-drawn here
     with small inline visuals (abacus, number line, count chips)
     so they work offline and read aloud cleanly.
     ========================================================== */

  /* ---- Small visual builders (returned as HTML strings) ---- */
  function A(tens, ones) {                       // abacus: tens + ones rods
    function rod(n, label) {
      var beads = "";
      for (var i = 0; i < n; i++) beads += '<i class="ab-bead c' + (i % 5) + '"></i>';
      return '<span class="ab-rod"><span class="ab-beads">' + beads +
             '</span><span class="ab-label">' + label + "</span></span>";
    }
    return '<span class="abacus">' + rod(tens, "T") + rod(ones, "O") + "</span>";
  }

  function NL(maxN, arcs) {                       // number line with jump arcs
    var step = 24, x0 = 18, y = 46, W = x0 + maxN * step + 14, H = 62;
    var s = '<svg class="numline" viewBox="0 0 ' + W + ' ' + H +
            '" role="img" aria-hidden="true">';
    s += '<line class="nl-axis" x1="8" y1="' + y + '" x2="' + (W - 5) + '" y2="' + y + '"/>';
    for (var i = 0; i <= maxN; i++) {
      var x = x0 + i * step;
      s += '<line class="nl-tick" x1="' + x + '" y1="' + (y - 4) + '" x2="' + x + '" y2="' + (y + 4) + '"/>';
      s += '<text class="nl-num" x="' + x + '" y="' + (y + 15) + '">' + i + "</text>";
    }
    arcs.forEach(function (a) {
      var x1 = x0 + a[0] * step, x2 = x0 + a[1] * step, r = (x2 - x1) / 2;
      s += '<path class="nl-arc" d="M ' + x1 + " " + y + " A " + r + " " + r +
           " 0 0 1 " + x2 + " " + y + '"/>';
      s += '<path class="nl-arrow" d="M ' + (x2 - 5) + " " + (y - 6) + " L " + x2 +
           " " + y + " L " + (x2 - 7) + " " + (y - 1) + ' Z"/>';
    });
    return s + "</svg>";
  }

  function CH(items) {                            // labelled number chips
    return '<span class="mchips">' + items.map(function (it) {
      return '<span class="mchip">' +
        (it.e ? '<span class="mchip-e" aria-hidden="true">' + it.e + "</span>" : "") +
        "<b>" + it.n + "</b>" +
        (it.t ? "<em>" + it.t + "</em>" : "") + "</span>";
    }).join("") + "</span>";
  }

  function ROW(e, n) {                            // a row of n emoji
    var s = "";
    for (var i = 0; i < n; i++) s += e;
    return '<span class="erow" aria-hidden="true">' + s + "</span>";
  }

  function GROUP(emoji, nums) {                    // numbers written on an object
    return '<span class="ngroup"><span class="ngroup-emoji" aria-hidden="true">' + emoji +
      '</span><span class="ngroup-nums">' +
      nums.map(function (n) { return "<b>" + n + "</b>"; }).join("") +
      "</span></span>";
  }

  // Countable scene: show the actual objects (no number) grouped into
  // labelled containers so the child can count and compare. Each item:
  //   { e: emoji, n: how many, t: label, bar: branch?, base: base emoji }
  function SET(items) {
    return '<span class="cset">' + items.map(function (it) {
      var things = "";
      for (var i = 0; i < it.n; i++) things += it.e;
      return '<span class="cset-item">' +
        '<span class="cset-things" aria-hidden="true">' + things + "</span>" +
        (it.bar ? '<span class="cset-bar" aria-hidden="true"></span>' : "") +
        (it.base ? '<span class="cset-base" aria-hidden="true">' + it.base + "</span>" : "") +
        '<span class="cset-label">' + it.t + "</span></span>";
    }).join("") + "</span>";
  }

  function EQ(html) { return '<span class="meq">' + html + "</span>"; }

  function VSUM() {                               // vertical addition puzzle
    return '<span class="vsum"><span class="vr">1&nbsp;5</span>' +
           '<span class="vr">+&nbsp;<b>P</b>&nbsp;3</span>' +
           '<span class="vbar"></span><span class="vr">6&nbsp;8</span></span>';
  }

  function TRAIN() {
    return '<span class="train"><span aria-hidden="true">🚂</span>' +
      ["A", "B", "C", "D", "E", "F"].map(function (c) {
        return '<span class="coach">' + c + "</span>";
      }).join("") + "</span>";
  }

  /* ---- Question bank ---- */
  var MATHS = [
    {
      id: "number-sense", label: "Number Sense", emoji: "🔢",
      sections: [
        {
          id: "reasoning", label: "Mathematical Reasoning", emoji: "🧠",
          questions: [
            { q: "Which fish shows the greatest number?",
              visual: CH([{ e: "🐟", n: 92, t: "P" }, { e: "🐟", n: 97, t: "Q" }, { e: "🐟", n: 79, t: "R" }, { e: "🐟", n: 62, t: "S" }]),
              options: ["Fish P", "Fish Q", "Fish R", "Fish S"], answer: 1,
              explain: "97 is the biggest of 92, 97, 79 and 62. Fish Q shows 97." },
            { q: "Which number comes just after 72?",
              options: ["Twenty seven", "Seventy two", "Seventy three", "Thirty seven"], answer: 2,
              explain: "Counting up, the number right after 72 is 73 — seventy three." },
            { q: "In which option are the numbers in order from smallest to biggest?",
              options: ["25, 52, 65, 56", "25, 65, 52, 56", "25, 65, 56, 52", "25, 52, 56, 65"], answer: 3,
              explain: "Smallest to biggest is 25, 52, 56, 65." },
            { q: "There are 6 tens and 5 ones in which number?",
              visual: A(6, 5),
              options: ["56", "65", "60", "50"], answer: 1,
              explain: "6 tens make 60 and 5 ones make 5. Together that is 65." },
            { q: "What comes before 85 but after 83?",
              options: ["48", "84", "44", "78"], answer: 1,
              explain: "The number between 83 and 85 is 84." },
            { q: "What number is shown on the abacus?",
              visual: A(5, 9),
              options: ["Thirty four", "Eighty two", "Fifty nine", "Twenty nine"], answer: 2,
              explain: "5 tens and 9 ones make 59 — fifty nine." },
            { q: "The greatest number of birds are sitting on which branch?",
              visual: SET([{ e: "🐦", n: 2, t: "W", bar: true }, { e: "🐦", n: 3, t: "X", bar: true }, { e: "🐦", n: 5, t: "Y", bar: true }, { e: "🐦", n: 4, t: "Z", bar: true }]),
              options: ["Branch W", "Branch X", "Branch Y", "Branch Z"], answer: 2,
              explain: "Branch Y has the most birds — 5 birds." },
            { q: "Select the correct match.",
              options: ["31 = 1 ten 3 ones", "38 = 8 tens 3 ones", "54 = 5 tens 4 ones", "69 = 9 tens 6 ones"], answer: 2,
              explain: "54 is 5 tens and 4 ones. The other matches are wrong." },
            { q: "Which apple shows the smallest number?",
              visual: CH([{ e: "🍎", n: 42, t: "P" }, { e: "🍎", n: 71, t: "Q" }, { e: "🍎", n: 17, t: "R" }, { e: "🍎", n: 44, t: "S" }]),
              options: ["Apple Q", "Apple S", "Apple R", "Apple P"], answer: 2,
              explain: "17 is the smallest of 42, 71, 17 and 44. Apple R shows 17." },
            { q: "Which set has more objects than these 5 rackets?",
              visual: ROW("🎾", 5),
              options: [ROW("💍", 5), ROW("🧺", 3), ROW("🥪", 5), ROW("🥤", 6)], optHtml: true, answer: 3,
              explain: "There are 5 rackets. Only the 6 cups are more than 5." },
            { q: "Which abacus shows the number of dolls?",
              visual: ROW("👧", 7),
              options: [A(0, 5), A(0, 7), A(1, 2), A(0, 8)], optHtml: true, answer: 1,
              explain: "There are 7 dolls, so the abacus shows 0 tens and 7 ones." },
            { q: "Which number is NOT shown on the mango?",
              visual: GROUP("🥭", [56, 25, 34, 82, 24]),
              options: ["24  (2 tens 4 ones)", "37  (3 tens 7 ones)", "82  (8 tens 2 ones)", "56  (5 tens 6 ones)"], answer: 1,
              explain: "The mango shows 56, 25, 34, 82 and 24. The number 37 is not there." },
            { q: "What does this number line show?",
              visual: NL(10, [[0, 2], [2, 4], [4, 6], [6, 8], [8, 10]]),
              options: ["Skip counting by 1's", "Skip counting by 4's", "Skip counting by 3's", "Skip counting by 2's"], answer: 3,
              explain: "The jumps land on 2, 4, 6, 8, 10 — skip counting by 2's." },
            { q: "Count the caps. Which number matches?",
              visual: ROW("🧢", 15),
              options: ["Eleven", "Sixteen", "Fifteen", "Eighteen"], answer: 2,
              explain: "There are 15 caps — fifteen." },
            { q: "How many butterflies are there altogether?",
              visual: ROW("🦋", 18),
              options: ["1 ten 8 ones (18)", "18 tens", "1 ten 6 ones (16)", "8 tens (80)"], answer: 0,
              explain: "18 butterflies is 1 ten and 8 ones, which is 18." }
          ]
        },
        {
          id: "everyday", label: "Everyday Maths", emoji: "🛒",
          questions: [
            { q: "Kajal bought a soft toy with a number more than 12 but less than 20. Which toy can be Kajal's?",
              visual: CH([{ e: "🐷", n: 9 }, { e: "🦁", n: 22 }, { e: "🐵", n: 17 }, { e: "🦓", n: 25 }]),
              options: ["Toy 9", "Toy 22", "Toy 17", "Toy 25"], answer: 2,
              explain: "Only 17 is more than 12 and less than 20." },
            { q: "Ananya has 65 blocks, Riddhi has 50 blocks and Suman has 42 blocks. Who has the least blocks?",
              visual: CH([{ e: "🧱", n: 65, t: "Ananya" }, { e: "🧱", n: 50, t: "Riddhi" }, { e: "🧱", n: 42, t: "Suman" }]),
              options: ["Riddhi", "Suman", "Ananya", "Can't say"], answer: 1,
              explain: "42 is the smallest number, so Suman has the least blocks." },
            { q: "A man has 6 hens and 4 cows. Which sentence is false?",
              visual: ROW("🐔", 6) + ROW("🐄", 4),
              options: ["Hens are more than cows", "Cows are less than hens", "Cows are equal to hens", "There are 6 hens"], answer: 2,
              explain: "There are 6 hens and 4 cows, so cows are not equal to hens. That sentence is false." },
            { q: "The pictures show balloons bought by four friends. Who bought the most balloons?",
              visual: SET([{ e: "🎈", n: 5, t: "Tania" }, { e: "🎈", n: 3, t: "Sahil" }, { e: "🎈", n: 6, t: "Teena" }, { e: "🎈", n: 4, t: "Varun" }]),
              options: ["Varun", "Sahil", "Teena", "Tania"], answer: 2,
              explain: "Teena has the most balloons — 6 balloons." },
            { q: "Sunil's parrot has a number greater than 60 but less than 70. Which is Sunil's parrot?",
              visual: CH([{ e: "🦜", n: 25, t: "P" }, { e: "🦜", n: 35, t: "Q" }, { e: "🦜", n: 63, t: "R" }, { e: "🦜", n: 18, t: "S" }, { e: "🦜", n: 41, t: "T" }, { e: "🦜", n: 72, t: "U" }]),
              options: ["Parrot U", "Parrot S", "Parrot P", "Parrot R"], answer: 3,
              explain: "63 is greater than 60 and less than 70. Parrot R shows 63." }
          ]
        },
        {
          id: "achievers", label: "Achievers Section", emoji: "🏆",
          questions: [
            { q: "Which number line shows a frog jumping by 5's?",
              options: [NL(10, [[0, 2], [2, 4], [4, 6]]), NL(10, [[0, 3], [3, 6], [6, 9]]), NL(10, [[0, 4], [4, 8]]), NL(10, [[0, 5], [5, 10]])], optHtml: true, answer: 3,
              explain: "Jumps of 5 land on 5 and then 10." },
            { q: "Which numbers are less than 42?  P is 2 tens 7 ones, Q is 3 tens 4 ones, R is 5 tens 3 ones, S is 4 tens 3 ones.",
              options: ["Both P and Q", "Only P", "P, Q and S", "P, Q, R and S"], answer: 0,
              explain: "P is 27 and Q is 34 — both less than 42. R is 53 and S is 43, which are not. So both P and Q." },
            { q: "Look at the sets of objects. Which sentence is correct?",
              visual: SET([{ e: "💡", n: 6, t: "Set X" }, { e: "🍃", n: 6, t: "Set Y" }, { e: "🎈", n: 5, t: "Set Z" }]),
              options: ["Set Y has more items than set Z", "Set X has less items than set Y", "Set Z has more items than set X", "All the sets are equal"], answer: 0,
              explain: "Set Y has 6 and set Z has 5, so Y has more items than Z." },
            { q: "A train has coaches A, B, C, D, E, F in order. Coach blank is just before E. Coach C is blank B and D. Coach B is just blank A.",
              visual: TRAIN(),
              options: ["D, between, after", "C, between, before", "A, after, after", "B, before, before"], answer: 0,
              explain: "Before E is D. C sits between B and D. B is just after A." }
          ]
        }
      ]
    },
    {
      id: "addition", label: "Addition", emoji: "➕",
      sections: [
        {
          id: "reasoning", label: "Mathematical Reasoning", emoji: "🧠",
          questions: [
            { q: "How many birds are there in both nests altogether?",
              visual: SET([{ e: "🐤", n: 8, t: "Nest P", base: "🪺" }, { e: "🐤", n: 6, t: "Nest Q", base: "🪺" }]),
              options: ["8 + 5 = 13", "7 + 5 = 12", "8 + 6 = 14", "7 + 4 = 11"], answer: 2,
              explain: "Nest P has 8 birds and nest Q has 6 birds. 8 + 6 = 14." },
            { q: "Find the missing value.",
              visual: EQ("43 + 42 = ?"),
              options: ["80", "81", "82", "85"], answer: 3,
              explain: "43 + 42 = 85." },
            { q: "Which addition do the abacuses show?",
              visual: '<span class="ab-sum">' + A(5, 4) + '<span class="ab-op">+</span>' + A(3, 1) + '<span class="ab-op">=</span>' + A(8, 5) + "</span>",
              options: ["53 + 32 = 85", "54 + 31 = 85", "51 + 33 = 84", "50 + 4 = 54"], answer: 1,
              explain: "The abacuses show 54 and 31. 54 + 31 = 85." },
            { q: "A frog jumps 2 steps from 0, then 4 more steps. Which number does it reach?",
              visual: NL(8, [[0, 2], [2, 6]]),
              options: ["5", "6", "7", "4"], answer: 1,
              explain: "2 steps and then 4 steps: 2 + 4 = 6." },
            { q: "Which abacus shows the sum 32 + 3?",
              visual: EQ("32 + 3 = ?"),
              options: [A(3, 2), A(3, 5), A(3, 3), A(2, 5)], optHtml: true, answer: 1,
              explain: "32 + 3 = 35, which is 3 tens and 5 ones." },
            { q: "Arrange the numbers on the ducks from smallest to greatest.",
              visual: CH([{ e: "🦆", n: 25, t: "P" }, { e: "🦆", n: 28, t: "Q" }, { e: "🦆", n: 29, t: "R" }, { e: "🦆", n: 27, t: "S" }]),
              options: ["P, S, Q, R", "S, R, Q, P", "Q, S, R, P", "R, Q, S, P"], answer: 0,
              explain: "P is 25, S is 27, Q is 28, R is 29. Smallest to greatest: P, S, Q, R." },
            { q: "Tanush adds two numbers and gets 54. What is he adding?",
              options: ["50 ones + 4 tens", "5 ones + 4 ones", "5 tens + 4 ones", "4 tens + 5 ones"], answer: 2,
              explain: "54 is 5 tens and 4 ones. So 5 tens + 4 ones = 54." },
            { q: "When 0 is added to 87, what is the sum?",
              visual: EQ("87 + 0 = ?"),
              options: ["76", "78", "87", "70"], answer: 2,
              explain: "Adding zero does not change a number. 87 + 0 = 87." },
            { q: "What is the sum of the smallest and the greatest number on the cloud?",
              visual: GROUP("☁️", [20, 52, 43, 13, 24, 31]),
              options: ["62", "67", "69", "65"], answer: 3,
              explain: "The smallest is 13 and the greatest is 52. 13 + 52 = 65." },
            { q: "Find the missing number.",
              visual: EQ("▢ + 12 = 23"),
              options: ["8", "9", "10", "11"], answer: 3,
              explain: "23 − 12 = 11, so the missing number is 11." },
            { q: "Which addition gives an answer more than 27 but less than 40?",
              options: ["23 + 26", "13 + 41", "24 + 15", "14 + 11"], answer: 2,
              explain: "24 + 15 = 39, which is more than 27 and less than 40." },
            { q: "What is the sum of 24 and 15?",
              visual: EQ("24 + 15 = ?"),
              options: ["Twenty nine", "Thirty five", "Thirty nine", "Twenty four"], answer: 2,
              explain: "24 + 15 = 39 — thirty nine." },
            { q: "Find the total number of fish in bowls P and Q.",
              visual: SET([{ e: "🐠", n: 6, t: "Bowl P", base: "🥣" }, { e: "🐠", n: 7, t: "Bowl Q", base: "🥣" }]),
              options: ["11", "17", "13", "15"], answer: 2,
              explain: "Bowl P has 6 fish and bowl Q has 7 fish. 6 + 7 = 13." },
            { q: "Find the total number of fish in bowls P, Q and R.",
              visual: SET([{ e: "🐠", n: 6, t: "Bowl P", base: "🥣" }, { e: "🐠", n: 7, t: "Bowl Q", base: "🥣" }, { e: "🐠", n: 5, t: "Bowl R", base: "🥣" }]),
              options: ["14", "16", "18", "20"], answer: 2,
              explain: "6 + 7 + 5 = 18 fish altogether." },
            { q: "Find the value of P.",
              visual: VSUM(),
              options: ["3", "4", "5", "6"], answer: 2,
              explain: "15 + 53 = 68, so P must be 5." }
          ]
        },
        {
          id: "everyday", label: "Everyday Maths", emoji: "🛒",
          questions: [
            { q: "There are 4 apples, 3 mangoes and 10 cherries in a basket. How many fruits are there altogether?",
              visual: ROW("🍎", 4) + ROW("🥭", 3) + ROW("🍒", 10),
              options: ["14", "15", "16", "17"], answer: 3,
              explain: "4 + 3 + 10 = 17 fruits." },
            { q: "Dhir has 31 pens. He buys 7 more pens. How many pens does he have altogether?",
              visual: CH([{ e: "🖊️", n: 31, t: "has" }, { e: "🖊️", n: 7, t: "buys more" }]),
              options: ["25", "38", "22", "39"], answer: 1,
              explain: "31 + 7 = 38 pens." },
            { q: "There are 32 ducks and 23 swans in a pond. How many ducks and swans are there altogether?",
              visual: CH([{ e: "🦆", n: 32, t: "ducks" }, { e: "🦢", n: 23, t: "swans" }]),
              options: ["55", "45", "52", "58"], answer: 0,
              explain: "32 + 23 = 55." },
            { q: "There are 6 snails and 4 caterpillars on a tree. How many are on the tree altogether?",
              visual: ROW("🐌", 6) + ROW("🐛", 4),
              options: ["13", "11", "8", "10"], answer: 3,
              explain: "6 + 4 = 10 altogether." },
            { q: "Priya has 14 animal stickers, 12 bird stickers and 32 flower stickers. How many stickers does she have altogether?",
              visual: CH([{ e: "🐾", n: 14, t: "animal" }, { e: "🐦", n: 12, t: "bird" }, { e: "🌸", n: 32, t: "flower" }]),
              options: ["48", "44", "46", "58"], answer: 3,
              explain: "14 + 12 + 32 = 58 stickers." }
          ]
        },
        {
          id: "achievers", label: "Achievers Section", emoji: "🏆",
          questions: [
            { q: "Vidhi, Rinu and Nidhi each have 5 dolls. How many dolls do they have altogether?",
              visual: ROW("🪆", 5) + ROW("🪆", 5) + ROW("🪆", 5),
              options: ["20", "15", "10", "25"], answer: 1,
              explain: "5 + 5 + 5 = 15 dolls." },
            { q: "Which addition is correct?",
              options: ["74 + 12 = 80", "35 + 62 = 89", "53 + 22 = 75", "26 + 43 = 72"], answer: 2,
              explain: "53 + 22 = 75 is correct. The others do not add up." },
            { q: "'4 more than 5' is shown by which number line?",
              options: [NL(10, [[5, 9]]), NL(10, [[0, 4]]), NL(10, [[4, 9]]), NL(10, [[5, 8]])], optHtml: true, answer: 0,
              explain: "4 more than 5 is 5 + 4 = 9. Start at 5 and jump 4 to reach 9." }
          ]
        }
      ]
    }
  ];

  /* ---- Maths DOM refs ---- */
  var mathsChapterGrid = $("#mathsChapterGrid");
  var mathsSectionGrid = $("#mathsSectionGrid");
  var mathsSectionHeading = $("#mathsSectionHeading");
  var mathsSectionSubtitle = $("#mathsSectionSubtitle");
  var explainToggle = $("#explainToggle");

  var quizQuestion = $("#quizQuestion");
  var quizVisual   = $("#quizVisual");
  var quizOptions  = $("#quizOptions");
  var quizExplain  = $("#quizExplain");
  var quizExplainText = $("#quizExplainText");
  var quizReadBtn  = $("#quizReadBtn");
  var speedVal     = $("#speedVal");
  var quizSubmitBtn = $("#quizSubmitBtn");
  var quizNextBtn  = $("#quizNextBtn");
  var quizPrevBtn  = $("#quizPrevBtn");
  var quizProgressLabel = $("#quizProgressLabel");
  var quizProgressLevel = $("#quizProgressLevel");
  var quizFill     = $("#quizFill");
  var quizBarEl    = $("#quizBarEl");
  var quizScore    = $("#quizScore");
  var quizResultText = $("#quizResultText");
  var quizResultEmoji = $("#quizResultEmoji");

  /* ---- Maths state ---- */
  var quiz = {
    list: [], index: 0, label: "",
    results: [],            // per-question { selected, submitted }
    rate: NORMAL_RATE,
    showExplain: true
  };

  /* ---- Chapter + section pickers ---- */
  function openMathsChapters() {
    stopQuizSpeech();
    mathsChapterGrid.innerHTML = "";
    MATHS.forEach(function (chap) {
      var count = chap.sections.reduce(function (n, s) { return n + s.questions.length; }, 0);
      var btn = document.createElement("button");
      btn.className = "section-card section-card-featured";
      btn.setAttribute("role", "listitem");
      btn.innerHTML =
        '<span class="section-num">' + chap.emoji + " " + chap.label + "</span>" +
        '<span class="section-range">Chapter</span>' +
        '<span class="section-meta">' + count + " questions</span>";
      btn.addEventListener("click", function () { openMathsSections(chap); });
      mathsChapterGrid.appendChild(btn);
    });
    showScreen(mathsChapterScreen);
  }

  function openMathsSections(chap) {
    stopQuizSpeech();
    mathsSectionHeading.textContent = chap.emoji + " " + chap.label;
    mathsSectionSubtitle.textContent = "Choose a part, then start.";
    mathsSectionGrid.innerHTML = "";

    chap.sections.forEach(function (sec) {
      var btn = document.createElement("button");
      btn.className = "section-card";
      btn.setAttribute("role", "listitem");
      btn.innerHTML =
        '<span class="section-num">' + sec.emoji + " " + sec.label + "</span>" +
        '<span class="section-range">Practice</span>' +
        '<span class="section-meta">' + sec.questions.length + " questions</span>";
      btn.addEventListener("click", function () {
        startQuiz(sec.questions, chap.label + " · " + sec.label);
      });
      mathsSectionGrid.appendChild(btn);
    });

    // "Whole chapter" card
    var all = [];
    chap.sections.forEach(function (s) { all = all.concat(s.questions); });
    var allBtn = document.createElement("button");
    allBtn.className = "section-card section-card-featured";
    allBtn.setAttribute("role", "listitem");
    allBtn.innerHTML =
      '<span class="section-num">📚 Whole chapter</span>' +
      '<span class="section-range">All sections</span>' +
      '<span class="section-meta">' + all.length + " questions</span>";
    allBtn.addEventListener("click", function () {
      startQuiz(all, chap.label + " · Whole chapter");
    });
    mathsSectionGrid.appendChild(allBtn);

    showScreen(mathsSectionScreen);
  }

  /* ---- Running a quiz ---- */
  function startQuiz(questions, label) {
    quiz.list = questions.slice();
    quiz.index = 0;
    quiz.label = label;
    quiz.results = [];
    quiz.showExplain = explainToggle.getAttribute("aria-checked") === "true";
    showScreen(quizScreen);
    renderQuestion();
  }

  function buildWordSpans(container, text) {
    container.innerHTML = "";
    var re = /[^\s]+/g, last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) container.appendChild(document.createTextNode(text.slice(last, m.index)));
      var span = document.createElement("span");
      span.className = "q-word";
      span.dataset.start = String(m.index);
      span.textContent = m[0];
      container.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) container.appendChild(document.createTextNode(text.slice(last)));
  }

  function renderQuestion() {
    stopQuizSpeech();
    var item = quiz.list[quiz.index];
    if (!item) return;
    var res = quiz.results[quiz.index];

    buildWordSpans(quizQuestion, item.q);
    quizVisual.innerHTML = item.visual || "";
    quizVisual.style.display = item.visual ? "" : "none";

    // Options
    quizOptions.innerHTML = "";
    quizOptions.classList.remove("locked");
    var letters = ["A", "B", "C", "D", "E", "F"];
    item.options.forEach(function (opt, i) {
      var b = document.createElement("button");
      b.className = "quiz-option";
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", "false");
      var body = '<span class="opt-letter">' + letters[i] + "</span>" +
                 '<span class="opt-body">' + (item.optHtml ? opt : escapeHtml(opt)) + "</span>";
      b.innerHTML = body;
      b.addEventListener("click", function () { selectOption(i); });
      quizOptions.appendChild(b);
    });

    // Restore any previous answer for this question
    if (res) {
      markSelected(res.selected);
      if (res.submitted) revealAnswer();
    }

    // Explanation
    quizExplain.hidden = true;

    // Actions
    var submitted = res && res.submitted;
    quizSubmitBtn.hidden = submitted;
    quizSubmitBtn.disabled = !(res && res.selected >= 0);
    quizNextBtn.hidden = !submitted;
    quizNextBtn.innerHTML = (quiz.index === quiz.list.length - 1)
      ? 'See score <span aria-hidden="true">▶</span>'
      : 'Next <span aria-hidden="true">▶</span>';
    quizPrevBtn.disabled = quiz.index === 0;

    // Progress
    var total = quiz.list.length, pos = quiz.index + 1;
    var pct = total ? Math.round((pos / total) * 100) : 0;
    quizProgressLabel.textContent = "Question " + pos + " of " + total;
    quizProgressLevel.textContent = quiz.label;
    quizFill.style.width = pct + "%";
    quizBarEl.setAttribute("aria-valuenow", String(pct));

    updateSpeedLabel();

    // Read the question aloud on arrival (the point of the app).
    setTimeout(function () {
      if (!quizScreen.hidden) speakQuestion();
    }, 320);
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function optionButtons() {
    return Array.prototype.slice.call(quizOptions.querySelectorAll(".quiz-option"));
  }

  function markSelected(i) {
    optionButtons().forEach(function (b, idx) {
      var on = idx === i;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-checked", on ? "true" : "false");
    });
  }

  function selectOption(i) {
    var res = quiz.results[quiz.index];
    if (res && res.submitted) return;         // locked after submit
    quiz.results[quiz.index] = { selected: i, submitted: false };
    markSelected(i);
    quizSubmitBtn.disabled = false;
  }

  function revealAnswer() {
    var item = quiz.list[quiz.index];
    var res = quiz.results[quiz.index];
    quizOptions.classList.add("locked");
    optionButtons().forEach(function (b, idx) {
      if (idx === item.answer) b.classList.add("correct");
      else if (idx === res.selected) b.classList.add("wrong");
    });
    if (quiz.showExplain) {
      quizExplainText.textContent = item.explain;
      quizExplain.hidden = false;
    }
  }

  function submitAnswer() {
    var res = quiz.results[quiz.index];
    if (!res || res.selected < 0 || res.submitted) return;
    res.submitted = true;
    revealAnswer();
    quizSubmitBtn.hidden = true;
    quizNextBtn.hidden = false;
    var item = quiz.list[quiz.index];
    if (res.selected === item.answer) {
      spawnConfetti(30);
      announce("Correct!");
    } else {
      announce("Not quite. The correct answer is " + item.options[item.answer]);
    }
  }

  function quizNext() {
    if (quiz.index < quiz.list.length - 1) { quiz.index++; renderQuestion(); }
    else finishQuiz();
  }
  function quizPrev() {
    if (quiz.index > 0) { quiz.index--; renderQuestion(); }
  }

  function finishQuiz() {
    stopQuizSpeech();
    var total = quiz.list.length, correct = 0;
    quiz.results.forEach(function (r, i) {
      if (r && r.submitted && quiz.list[i] && r.selected === quiz.list[i].answer) correct++;
    });
    quizScore.textContent = correct + " out of " + total + " correct";
    var pct = total ? correct / total : 0;
    if (pct === 1) { quizResultEmoji.textContent = "🏆"; quizResultText.textContent = "Perfect score! Amazing work!"; }
    else if (pct >= 0.7) { quizResultEmoji.textContent = "🎉"; quizResultText.textContent = "Great job! Keep it up!"; }
    else if (pct >= 0.4) { quizResultEmoji.textContent = "🌟"; quizResultText.textContent = "Good try! Practice makes perfect."; }
    else { quizResultEmoji.textContent = "🌱"; quizResultText.textContent = "Nice effort! Let's try again."; }
    showScreen(quizResultScreen);
    if (pct >= 0.7) bigCelebrate();
  }

  /* ---- Read the question aloud, underlining each word ---- */
  var quizTimers = [];
  function clearQuizTimers() { quizTimers.forEach(clearTimeout); quizTimers = []; }
  function clearQuizReading() {
    quizQuestion.querySelectorAll(".q-word.reading-word")
      .forEach(function (s) { s.classList.remove("reading-word"); });
  }
  function stopQuizSpeech() {
    stopAudio();
    if (synth && synth.speaking) synth.cancel();
    clearQuizTimers();
    clearQuizReading();
    if (quizReadBtn) quizReadBtn.classList.remove("speaking");
  }

  function speakQuestion() {
    var item = quiz.list[quiz.index];
    if (!item) return;
    var text = quizQuestion.textContent;
    var spans = Array.prototype.slice.call(quizQuestion.querySelectorAll(".q-word"));
    clearQuizReading();
    clearQuizTimers();
    var url = clipUrlFor(text);
    if (url) {
      playClip(url, {
        rate: quiz.rate / NORMAL_RATE, btn: quizReadBtn,
        spans: spans, total: text.length || 1,
        onWord: function (sp) { clearQuizReading(); sp.classList.add("reading-word"); },
        onEnd: clearQuizReading,
        fallback: ttsSpeakQuestion
      });
      return;
    }
    ttsSpeakQuestion();
  }

  function ttsSpeakQuestion() {
    var item = quiz.list[quiz.index];
    if (!item) return;
    if (!synth) { warnNoSpeech(); return; }
    synth.cancel();
    clearQuizReading();
    clearQuizTimers();

    var text = quizQuestion.textContent;
    var spans = Array.prototype.slice.call(quizQuestion.querySelectorAll(".q-word"));
    var total = text.length || 1;

    var u = new SpeechSynthesisUtterance(text);
    var v = pickVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || "en-US";
    u.rate = quiz.rate;
    u.pitch = 1.05;
    quizReadBtn.classList.add("speaking");

    var usedBoundary = false;
    u.onboundary = function (e) {
      if (e.name && e.name !== "word") return;
      usedBoundary = true;
      clearQuizTimers();
      var idx = e.charIndex, target = null;
      for (var i = 0; i < spans.length; i++) {
        var st = +spans[i].dataset.start, en = st + spans[i].textContent.length;
        if (idx >= st && idx < en) { target = spans[i]; break; }
        if (st <= idx) target = spans[i];
      }
      clearQuizReading();
      if (target) target.classList.add("reading-word");
    };
    u.onstart = function () {
      if (usedBoundary) return;
      var msPerChar = 68 / (u.rate || 1);
      var totalMs = Math.max(700, total * msPerChar);
      spans.forEach(function (sp) {
        var frac = (+sp.dataset.start) / total;
        var t = setTimeout(function () {
          if (!usedBoundary) { clearQuizReading(); sp.classList.add("reading-word"); }
        }, Math.round(frac * totalMs));
        quizTimers.push(t);
      });
    };
    u.onend = u.onerror = function () {
      clearQuizTimers();
      clearQuizReading();
      quizReadBtn.classList.remove("speaking");
    };
    synth.speak(u);
  }

  function updateSpeedLabel() {
    var mult = Math.round((quiz.rate / NORMAL_RATE) * 10) / 10;
    speedVal.textContent = mult.toFixed(1) + "×";
  }
  function changeRate(delta) {
    quiz.rate = Math.min(1.3, Math.max(0.55, Math.round((quiz.rate + delta) * 100) / 100));
    updateSpeedLabel();
    speakQuestion();
  }

  /* ---- Maths event wiring ---- */
  explainToggle.addEventListener("click", function () {
    var on = explainToggle.getAttribute("aria-checked") !== "true";
    explainToggle.setAttribute("aria-checked", on ? "true" : "false");
    explainToggle.classList.toggle("on", on);
  });
  quizReadBtn.addEventListener("click", speakQuestion);
  $("#speedDownBtn").addEventListener("click", function () { changeRate(-0.15); });
  $("#speedUpBtn").addEventListener("click", function () { changeRate(0.15); });
  quizSubmitBtn.addEventListener("click", submitAnswer);
  quizNextBtn.addEventListener("click", quizNext);
  quizPrevBtn.addEventListener("click", quizPrev);
  $("#quizAgainBtn").addEventListener("click", function () {
    quiz.index = 0; quiz.results = [];
    showScreen(quizScreen); renderQuestion();
  });
  $("#quizHomeBtn").addEventListener("click", function () {
    stopQuizSpeech(); showScreen(chooseScreen);
  });

  /* ==========================================================
     16b. Audio-clip string collector
     ----------------------------------------------------------
     Returns every exact string the app can speak. The build
     script (generate_audio.py) uses this list to create one MP3
     per string. Exposed on window so it can be dumped from the
     browser console:  copy(JSON.stringify(window.__audioStrings()))
     ========================================================== */
  function collectAudioStrings() {
    const set = {};
    const add = function (t) {
      if (t == null) return;
      t = String(t).trim();
      if (t) set[t] = true;
    };
    Object.keys(WORDS).forEach(function (g) {
      WORDS[g].forEach(function (it) {
        add(it.w); add(it.s);
        (it.p || []).forEach(add);
      });
    });
    NUMBER_WORDS.forEach(function (it) {
      add(it.w); add(it.s);
      (it.p || []).forEach(add);
    });
    MATHS.forEach(function (ch) {
      ch.sections.forEach(function (sec) {
        sec.questions.forEach(function (q) { add(q.q); });
      });
    });
    return Object.keys(set);
  }
  try { window.__audioStrings = collectAudioStrings; } catch (e) {}

  /* ==========================================================
     17. Init
     ========================================================== */
  initTheme();
  updateOverall();
  showScreen(chooseScreen);

})();
