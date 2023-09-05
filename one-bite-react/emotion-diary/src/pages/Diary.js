import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
// 커스텀 훅(별도의 라이브러리가 자신의 라이브러리의 기능을 더 편하게 사용할 수있도록 함 )
import MyHeader from "../components/Myheader";
import MyButton from "../components/MyButton";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams(); // path variable
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      ); //형변환 잊지 말것

      if (!targetDiary) {
        alert("없는 일기 입니다.");
        navigate("/", { replace: true });
        return;
      }
      setData(targetDiary);
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          leftChild={
            <MyButton
              text={"뒤로가기"}
              onClick={() => {
                navigate(-1);
              }}
            />
          }
          headerText={`${getStringDate(new Date(data.date))} 기록`}
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          {/* 여기서부터 content */}
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} />
              <div className="emotion_descript">
                {curEmotionData.emotion_description}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
