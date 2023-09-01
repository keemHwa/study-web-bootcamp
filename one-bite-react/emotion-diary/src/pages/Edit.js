import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {

    const navigate = useNavigate(); // Routes에 등록한 경로와 일치하는 파일을 찾음
    const [searchParams, setSearchParams] = useSearchParams(); // Query String ?id=

    const id = searchParams.get('id');
    console.log(id);

    return (
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기 편집 페이지 입니다.</p>
            <button onClick={() => setSearchParams({who:'kjs'})}> Query String 바꾸기 </button>
            <button onClick={() => navigate('/home')}>홈으로가기</button>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
    );
};

export default Edit;