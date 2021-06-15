import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import formatDate from '../utils/formatDate';
import formatTranscript from '../utils/formatTranscript';
import Spinner from './Spinner';
const Comics = () => {
  const { comicNum } = useParams();
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState({});
  const [alert, setAlert] = useState({
    msg: '',
    isError: false,
  });
  const { msg, isError } = alert;
  useEffect(() => {
    comicNum == null ? getCurrentComic() : getCurrentComicByNumber(comicNum);
    // eslint-disable-next-line
  }, []);
  const removeLoading = () => {
    setLoading(false);
  };
  const getCurrentComic = async () => {
    try {
      const res = await axios.get('/comics');
      setComic(res.data);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, isError: true });
    }
    removeLoading();
  };
  const getCurrentComicByNumber = async (comicNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(`/comics/${comicNumber}`);
      setComic(res.data);
      setLoading(false);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, isError: true });
    }
    removeLoading();
  };
  const getRandomComic = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/comics/comicsNum/random');
      setComic(res.data);
    } catch (error) {
      setAlert({ msg: error.response.data.msg, isError: true });
    }
    removeLoading();
  };
  return (
    <div className='comic-container center'>
      {loading ? (
        <Spinner />
      ) : (
        <div className='comic-container__elements'>
          {isError ? (
            <span className='red'> {msg} by reloading the page. </span>
          ) : (
            <Fragment>
              <div className='comic-container__elements--button'>
                <button
                  className='btn'
                  onClick={() => getCurrentComicByNumber(comic.num - 1)}
                >
                  {' '}
                  Prev{' '}
                </button>
                <button className='btn' onClick={getRandomComic}>
                  {' '}
                  Random{' '}
                </button>
                <button
                  className='btn'
                  onClick={() => getCurrentComicByNumber(comic.num + 1)}
                >
                  {' '}
                  Next{' '}
                </button>
              </div>
              <h2> {comic.title}</h2>
              <h4> {formatDate(comic.year, comic.month, comic.day)}</h4>
              <div className='comic-container__elements--image'>
                <img src={comic.img} alt={comic.title} />
              </div>
              <div>
                {' '}
                {formatTranscript(comic.transcript).map((line, i) => (
                  <Fragment key={i}>
                    <p> {line} </p>
                  </Fragment>
                ))}
              </div>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default Comics;
