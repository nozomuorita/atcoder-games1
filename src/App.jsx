import { useState } from 'react'
import { Data1 } from "./assets/data/in/Data1.jsx";
import { Data2 } from "./assets/data/in/Data2.jsx";
import { Data3 } from "./assets/data/in/Data3.jsx";
import { Data4 } from "./assets/data/in/Data4.jsx";
import { Answer1 } from "./assets/data/out/Answer1.jsx";
import { Answer2 } from "./assets/data/out/Answer2.jsx";
import { Answer3 } from "./assets/data/out/Answer3.jsx";
import { Answer4 } from "./assets/data/out/Answer4.jsx";

import './App.css'
import img0 from './assets/image/img0.png';
import img1 from './assets/image/img1.png';
import img2 from './assets/image/img2.png';
import ac from './assets/image/ac.png';
import wa from './assets/image/wa.png';
import poison from './assets/image/poison.png';
import portion from './assets/image/portion.png';

function App() {
  const [DataNum, setDataNum] = useState(0);
  const Data = [Data1, Data2, Data3, Data4];
  const Answer = [Answer1, Answer2, Answer3, Answer4];
  const [idx, setIdx] = useState(0)                             // dataのインデックス
  const [st, setSt] = useState(0)                               // 状態(0: 元気, 1: 腹痛, 2: 死亡)
  const [score, setScore] = useState(0)                         // おいしさ
  const img_set = [img0, img1, img2, ac, wa]                 // 画像セット
  const txt_set = ["元気", "腹痛", "死亡", "おめでとう！", "もっと良い解があるよ！"]          // テキストセット
  const img_set2 = [portion, poison]
  const txt_set2 = ["解毒剤入り", "毒入り", "終了"]
  const [idx2, setIdx2] = useState(Data[DataNum][0]["state"])
  // 食べるとき
  const choice = () => {
    if (st!=2){

      if (idx!=Data[DataNum].length){
        if (Data[DataNum][idx]["state"]==1){
          setSt(st+1);
        }
        else if (Data[DataNum][idx]["state"]==0){
          if (st!=0) setSt(st-1);
        }

      }

      setScore(score+Data[DataNum][idx]["yammy"]);
      console.log("score: ", score)
    
      if (idx!=Data[DataNum].length-1){
        setIdx(idx+1);
        setIdx2(Data[DataNum][idx+1]["state"]);
      }

      // n品食べ終えた時の処理
      if (idx==Data[DataNum].length-2){
        if ((st==1)&&(Data[DataNum][idx]["state"]==1)){setSt(st-st+2)}
        else if (score+Data[DataNum][idx]["yammy"]==Answer[DataNum]){setSt(st-st+3)}
        else{setSt(st-st+4)}
        setIdx2(idx2-idx2+2);
      }
    }

  }

  // 食べないとき
  const choice2 = () => {
    // if ((Data[idx]["state"]==1)||(Data[idx]["state"]==0)){
    //   setIdx2(Data[idx]["state"]);
    // }else {setIdx2(idx2-idx2+2)}
    console.log("score: ", score)
    if (st!=2){
        if (idx!=Data[DataNum].length){
          setIdx(idx+1);
          console.log("koko", idx)
          setIdx2(Data[DataNum][idx+1]["state"]);
        }
      // n品食べ終えた時の処理
      if (idx==Data[DataNum].length-2){
        if (score==Answer[DataNum]){setSt(st-st+3)}
        else{setSt(st-st+4)}
        setIdx2(idx2-idx2+2);
      }

    }

  }

  const restart = () => {
    setIdx(idx-idx);
    setIdx2(Data[DataNum][0]["state"]);
    setSt(st-st);
    setScore(score-score);
  }

  const change_data1 = () => {
    setDataNum(DataNum-DataNum+0);
    setIdx2(Data[0][0]["state"]);
    setIdx(idx-idx);
    setSt(st-st);
    setScore(score-score);
  }
  const change_data2 = () => {
    setDataNum(DataNum-DataNum+1);
    setIdx2(Data[1][0]["state"]);
    setIdx(idx-idx);
    setSt(st-st);
    setScore(score-score);
  }
  const change_data3 = () => {
    setDataNum(DataNum-DataNum+2);
    setIdx2(Data[2][0]["state"]);
    setIdx(idx-idx);
    setSt(st-st);
    setScore(score-score);
  }
  const change_data4 = () => {
    setDataNum(DataNum-DataNum+3);
    setIdx2(Data[3][0]["state"]);
    setIdx(idx-idx);
    setSt(st-st);
    setScore(score-score);
  }

  return (
    <>
      <div className='overlay'></div>
      <h1>AtCoder Games</h1>
      <h2><a href='https://atcoder.jp/contests/abc306/tasks/abc306_d' target='_blank'>ABC306-D Poisonous Full-Course</a></h2>

      <div className='wrapper'>
      <div className='left-contena'>
      <div className='contena'>
        <p><b>{txt_set[st]}</b></p>
        <img src={img_set[st]} className='image'/>
        {console.log(st, "status0")}
        {console.log(idx, "idx0")}
        {console.log(idx2, "idx2_0")}
        {console.log(score, "score0")}
        {/* {owari()} */}
      </div>

      <div className='score-contena'>
        <p>Score: {score}</p>
      </div>

      <div className='choice'>
        <div className='status'>
          <img src={img_set2[Data[DataNum][idx]["state"]]} />
          <p className='poison'>
            {
              // Data[idx]["state"] ? "毒入り": "解毒剤入り"
              // txt_set2[Data[DataNum][idx]["state"]]
              txt_set2[idx2]
            }
          </p>
          {/* <p className='poison'>{Data[idx]["state"] ? "毒入り": "解毒剤入り"}</p> */}
          <p className='yammy'>{Data[DataNum][idx]["yammy"]}</p>
        </div>
        <div className='button-group'>
          <button className='eat' onClick={choice}>食べる</button>
          <button className='not-eat' onClick={choice2}>食べない</button>
          <button className='res' onClick={restart}>やり直す</button>
        </div>
      </div>
      </div>

      <div className='dish-contena'>
        <div>
          <button onClick={change_data1}>Data1</button>
          <button onClick={change_data2}>Data2</button>
          <button onClick={change_data3}>Data3</button>
          <button onClick={change_data4}>Data4</button>
        </div>
        <table border={5} className='dish-table'>
          <tr>
            <th style={{backgroundColor: '#eaf6ff'}}>状態<br></br>(0: 解毒剤入り, 1: 毒入り)</th>
            <th style={{backgroundColor: '#eaf6ff'}}>おいしさ</th>
          </tr>
          {Data[DataNum].map((value, key) => {
            if (key!=Data[DataNum].length-1){
              if (key==idx){
                return (
                  <tr key={key}>
                    <td style={{backgroundColor: '#006ab6', color: "white"}}>{value.state}</td>
                    <td style={{backgroundColor: '#006ab6', color: "white"}}>{value.yammy}</td>
                  </tr>
                )
              }else{
                return (
                  <tr key={key}>
                    <td style={{backgroundColor: '#eaf6ff'}}>{value.state}</td>
                    <td style={{backgroundColor: '#eaf6ff'}}>{value.yammy}</td>
                  </tr>
                )
              }
            }
          })}
        </table>
      </div>
      </div>
    </>
  )
}

export default App
