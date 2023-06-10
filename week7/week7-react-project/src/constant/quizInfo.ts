import {
  Easy_1,
  Easy_2,
  Easy_3,
  Easy_4,
  Easy_5,
  Normal_1,
  Normal_2,
  Normal_3,
  Normal_4,
  Normal_5,
  Normal_6,
  Normal_7,
  Hard_1,
  Hard_2,
  Hard_3,
  Hard_4,
  Hard_5,
  Hard_6,
  Hard_7,
  Hard_8,
  Hard_9,
} from "../assets/index";

export interface quizInfo {
  level: string;
  totalScore: number;
  imgList: string[];
}

const quizList: quizInfo[] = [
  {
    level: "EASY",
    totalScore: 5,
    imgList: [Easy_1, Easy_2, Easy_3, Easy_4, Easy_5],
  },
  {
    level: "NORMAL",
    totalScore: 7,
    imgList: [
      Normal_1,
      Normal_2,
      Normal_3,
      Normal_4,
      Normal_5,
      Normal_6,
      Normal_7,
    ],
  },
  {
    level: "HARD",
    totalScore: 9,
    imgList: [
      Hard_1,
      Hard_2,
      Hard_3,
      Hard_4,
      Hard_5,
      Hard_6,
      Hard_7,
      Hard_8,
      Hard_9,
    ],
  },
];

export default quizList;
