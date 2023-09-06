import React from "react";

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_description,
  onClick,
  // useState 상태변화 함수가 아니거나, useCallback으로묶어놓지 않으면 컴포넌트 렌더링 될 때 재생성된다.
  isSelected,
}) => {
  return (
    <div
      className={[
        "Emotion_item",
        isSelected === true ? `emotionItem_on${emotion_id}` : `emotionItem_off`,
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img}></img>
      <span>{emotion_description}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
