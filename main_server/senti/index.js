const calLover = require('./lovers.js'),
    senti = require('./senti-google.js')

var mysql = require('mysql'), loverSql, sentSql;
  dbConnection = mysql.createConnection({
  host: "13.209.8.64",
  user: "teamRedFan",
  password: "1234",
  database: "redFan"
});


/* Responsible Example of Using 'lovers.js' module */
let totalCommentAuthor = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'C', 'D', 'D', 'D', 'D', 'D', 'E', 'F', 'G', 'H', '1', '2', '3', '4', '5', '6', '7', '8']
let subscriberCount = 1000

const { loverRate, loverCount } = calLover(totalCommentAuthor, subscriberCount)

console.log(loverRate, loverCount, subscriberCount)

/* --------------------------------------- */

/* Responsible Example of Using 'senti-google.js' module */
let commentPerVideo = [
    '요즘 좀 더 성숙한 느낌인데? 존예',
    '수리 9점이면 음대 가셨나 보다 음대에서 교직이수면 공부 잘 하셨군ㄷㄷ',
    '임용시험용시험 보는 사람 말곤 아무도 인정 안 해주는 그놈의 고시. 7급 시험도 7급 고시라 그러지 왜? 7급이 더 어려운데 ㅋㅋ 고시는 사법고시 행정고시 외무고시 이렇게 딱 세개여 이 양반들아. 7급한테도 못 비비는 게 임용시험인데 뭔놈의 고시는 ㅋㅋ',
    'ㄹㅇ 임용1차를 붙었다고?',
    '풀지말고 찍으면 20점은 나올텐데...',
    '역사는! 최태성!',
    '공부랑 기본상식이랑 별 상관없는건가봐요',
    '소풍왔니 국어교육, 숑아 영어교육, 마뫄 서울교대생, 승딸님도 ?',
    '공부잘하는거랑 멍청한거랑 별개임',
    '승딸님 예쁘네요',
    '그때 최태성 막 나오기 시작할때라, 끝까지 못보고 시험쳐서 떨어졌었죠... 강의가 다 안나와서... 막 중학교 국사 강의하고 그러실때였는데ㅜ',
    '헐...임용 1차 통과했다니 ㄷㄷㄷㄷ 검은사막이 무슨짓을 한겨',
    '암기스택 몰빵',
    '하면 하는 여자구나 멋있다',
    '갑자기 외모 떡상 ㄷ',
    '임용고시 합격할정도면 진짜 똑똑한건데',
    'ㅋㅋㅋㅋ무식한 거 컨셉이라고 생각은 했는데ㅋㅋㅋㅋ',
    '똑똑한 사람이었어? 승딸이가?',
    '잘 찾아보면 트위치에 능력자 개많은 듯',
    '뭐야 그냥 평소 승따리쟈너',
    '너무 이뻐졌네...',
    '커여운 승달이......',
    '기여워죽겟네',
    '3천원 코훌쩍',
    'ㅋㅋㅋ커엽',
    '뗑컨이 조아~',
    '춤추는거 보고 때밀이 춤인줄',
    '뗑컨님 그립읍니다',
    '황우슬혜 닮으셨네여 이쁨 ㅎㅎ',
    '이모티콘 추가 개꿀',
    '샀어! 귀엽',
    '택배받는 거 만큼 즐거운 일도 없지 ㅎ',
    '빛 승 딸',
    '화장이 진해진게 아니라 아이라인 쪼끔 길게 그리시는거 같은데 잘 어울리고 보기 좋은데 ㅎ',
    '캠 바꿈???????????????',
    '지금 귀걸이는 여눈인가요',
    '뭐여 시청자들 심쿵사 시키려는 의도여????',
]

const doAsync = async (commentPerVideo) => {
    let data = await senti(commentPerVideo)
    console.log(data) // ex) data = { neg: 4, com: 17, pos: 16 , total: 37 }, json type
}
module.exports = doAsync;
