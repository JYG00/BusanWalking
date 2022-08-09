export default function reducer(state: object[], action: string) {
  //   let TourList = [];

  switch (action) {
    case "ADD_DATA":
      fetch(
        "http://apis.data.go.kr/6260000/WalkingService/getWalkingKr?serviceKey=hGeBuMFhtkE6bZ%2F2wNlO2vAP6MQevzRFM0I3Zz3ILWTCbLbTHuNHDKtwOwcOENS%2FvJknwdmrLYTYH8pNbyhWzA%3D%3D&numOfRows=37&pageNo=1&resultType=json"
      )
        .then((res) => res.json())
        .then((data) => ({ ...state, data }))
        .catch((err) => console.log(err));
      break;
    case "LOAD_DATA":
      return state;
    default:
      break;
  }

  return state;
}
