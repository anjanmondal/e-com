import { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const Loading = () => {

    const navigate = useNavigate();
    let {search} = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get('next');
    
    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`/${nextUrl}`)
            }, 2000)
        }
    }, [nextUrl, navigate] )

    return (
        <div className="container my-5 py-5">
            <div className="row my-5 py-5">
                <div className="col text-center my-5 py-5">
                    <Spinner animation="border" variant="success" />
                </div>
            </div>
        </div>
    );
};

export default Loading;