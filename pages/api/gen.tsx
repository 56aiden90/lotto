import { ApiResponse } from "@lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  try {
    if (!req.body.name) throw { dev: "name은 필수 인자입니다." };
    if (!req.body.birth) throw { dev: "birth는 필수 인자입니다." };
    // todo : name, birth 를 통해 lotto 번호 생성
    const numbers = new Array(45).fill(1).map((v, i) => v + i);

    while (numbers.length > 6) {
      const start = Math.floor(Math.random() * numbers.length);
      numbers.splice(start, 1);
    }
    res.json({
      success: true,
      numbers,
    });
  } catch (error) {
    res.json({
      success: false,
      devMsg: error.dev,
      userMsg: "서버 내부 에러",
    });
  }
};
