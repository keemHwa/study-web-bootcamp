import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState(); // targetDiary를 담아서 활용

  const navigate = useNavigate(); // Routes에 등록한 경로와 일치하는 파일을 찾음
  // const [searchParams, setSearchParams] = useSearchParams(); // Query String ?id=
  const { id } = useParams();
  const diayrList = useContext(DiaryStateContext); //diaryList 받아오기

  useEffect(() => {
    if (diayrList.length >= 1) {
      const targetDiary = diayrList.find(
        (it) => parseInt(it.id) === parseInt(id)
      ); // find(없으면 undefined)는 첫번째로 충족하는 요소만 가져오고 filter는 충족하는 모든 요소(없으면 빈배열) 를 가져온다.
      // 하나의 값만 받고 그걸 이용하는거려면 find가 이후 데이터 활용하기 편하다..

      if (!targetDiary) {
        navigate("/", { replace: true });
        return;
      }
      setOriginData(targetDiary);
    }
  }, [id, diayrList]); // id나 diaryList가 바뀌었을때 가져오도록

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
