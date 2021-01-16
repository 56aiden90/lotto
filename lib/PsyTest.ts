import Question from '@model/Question';
const PsyTest: Question[] = [
    {
        id: 1,
        title: "가장 좋아하는 색깔을 골라주세요",
        options: [
            {
                label: "빨강",
                value: "red",
            },
            {
                label: "파랑",
                value: "blue",
            },
            {
                label: "초록",
                value: "green",
            },
            {
                label: "보라",
                value: "purple",
            },
        ],
    },
    {
        id: 2,
        title: "다시 태어난다면 어느 대륙 사람으로 태어나고 싶으신가요?",
        options: [
            {
                label: "아시아",
                value: "asia",
            },
            {
                label: "북미",
                value: "northAmerica",
            },
            {
                label: "남미",
                value: "southAmerica",
            },
            {
                label: "유럽",
                value: "europe",
            },
            {
                label: "아프리카",
                value: "africa",
            },
        ],
    },
    {
        id: 3,
        title: "오늘의 기분을 5점 만점 점수로 표현한다면?",
        options: [
            {
                label: "1점",
                value: "1",
            },
            {
                label: "2점",
                value: "2",
            },
            {
                label: "3점",
                value: "3",
            },
            {
                label: "4점",
                value: "4",
            },
            {
                label: "5점",
                value: "5",
            },
        ],
    },
    {
        id: 4,
        title: "가장 좋아하는 계절을 골라주세요",
        options: [
            {
                label: "봄",
                value: "spring",
            },
            {
                label: "여름",
                value: "summer",
            },
            {
                label: "가을",
                value: "fall",
            },
            {
                label: "겨울",
                value: "winter",
            },
        ],
    },
    {
        id: 5,
        title: "다음 중 가장 마음에 드는 단어를 골라주세요",
        options: [
            {
                label: "갱생",
                value: "rebirth",
            },
            {
                label: "성공",
                value: "success",
            },
            {
                label: "권력",
                value: "power",
            },
            {
                label: "부",
                value: "wealth",
            },
        ],
    },
];

export default PsyTest;