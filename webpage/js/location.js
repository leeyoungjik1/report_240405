const mapAPI = document.getElementById('map-API')
const findAWayBtn = document.getElementById('findaway-btn')
const mapOptions = {
    center: new kakao.maps.LatLng(36.363903, 127.249803), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
}

const map = new kakao.maps.Map(mapAPI, mapOptions); //지도 생성 및 객체 리턴

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


var imageSrc = 'http://127.0.0.1:5500/webpage/img/marker_map.png', // 마커이미지의 주소입니다    
    imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(36.363903, 127.249803); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);  

// 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
var content = '<div class="customoverlay">' +
    '  <a href="https://map.kakao.com/link/map/1478878965" target="_blank">' +
    '    <span class="title">꽃뜨 도자기카페</span>' +
    '  </a>' +
    '</div>';

// 커스텀 오버레이가 표시될 위치입니다 
var position = new kakao.maps.LatLng(36.363903, 127.249803);  

// 커스텀 오버레이를 생성합니다
var customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: position,
    content: content,
    yAnchor: 1 
});



function findAWay(){
    window.open('https://map.kakao.com/link/to/1478878965')
}

findAWayBtn.addEventListener('click', findAWay)