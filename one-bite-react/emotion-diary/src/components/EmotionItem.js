const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_description,
  onClick,
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

export default EmotionItem;
