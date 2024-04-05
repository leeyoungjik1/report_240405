const calendarTable = document.getElementById("calendar")
const calendarTableTitle = document.getElementById("calendarTitle")
const selectTimeBox = document.getElementById('select-time-box')
const timeTable = document.getElementById("timetable")
const timeTableWrap = document.getElementById("timetable-wrap")
const reserveSelect = document.getElementById('reserve-select')
const btnReserve = document.querySelector('.btn.reserve')
const showDate = document.getElementById('show-date')
const btnsDetails = document.querySelectorAll('.btn-details')
const detailsTotal = document.getElementById('details-total')
const detailsInputs = document.querySelectorAll('#details-container input')
const modalDetails = document.getElementById('modal-details')
const ticketBox = document.getElementById('ticket-box')
const showResultBox = document.getElementById('show-result-box')
const totalPriceBox = document.getElementById('total-price-box')
const btnTicketAdd = document.querySelector('.btn-ticket.add')
const btnsPayment = document.querySelectorAll('.btn-payment')
const paymentInputs = document.querySelectorAll('#payment-container input')
const modalPayment = document.getElementById('modal-payment')
const ticketBoxPayment = document.getElementById('ticket-box-payment')
const paymentTotal = document.getElementById('payment-total')

const saveReserveArr = []
let loadReserveArr = []
let tempDetailsArr = []
if(JSON.parse(localStorage.getItem('reservation'))){
	loadReserveArr = JSON.parse(localStorage.getItem('reservation'))
}
console.log(loadReserveArr)
const detailsType = {adult: 10000, youth: 5000, child: 3000}
const detailsDiscount = {resident: -2000, pass: -1000}
const detailsOption = {drink: 4000, souvenir: 15000}
const transdetailsType = {adult: "어른", youth: "청소년", child: "어린이"}
const transdetailsDiscount = {resident: "지역민 할인", pass: "지역 패스권"}
const transdetailsOption = {drink: "음료", souvenir: "기념품"}
let totalPriceResult = null

let today = new Date()
let todayFixed = new Date()
let startTime = "10"
let endTime = "16"
let maxOfReserveNum = endTime - startTime


buildCalendar()


function buildCalendar(){
	let row = null
	let cnt = 0

	calendarTableTitle.innerHTML = today.getFullYear()+"년 "+(today.getMonth()+1)+"월"

	const firstDate = new Date(today.getFullYear(), today.getMonth(), 1)
	const lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0)

	while(calendarTable.rows.length > 2){
		calendarTable.deleteRow(calendarTable.rows.length -1)
	}

	row = calendarTable.insertRow()
	for(i = 0; i < firstDate.getDay(); i++){
		cell = row.insertCell()
		cnt += 1
	}
	for(i = 1; i <= lastDate.getDate(); i++){
		cell = row.insertCell()
		cnt += 1

		cell.setAttribute('id', i)
		cell.innerHTML = i
		cell.style.border = '1px solid var(--gray-color-5)'
		cell.className = 'cell-date'

		if(cnt % 7 == 0){
			cell.innerHTML = i
			cell.style.color = 'blue'
			row = calendar.insertRow();
		}
		if(cnt % 7 == 1) {
			cell.innerHTML = i
			cell.style.color = 'red'
		}

		applyColorCell()
	}
	if(cnt % 7 !== 0){
		for(i = 0; i < 7 - (cnt % 7); i++){
			cell = row.insertCell()
		}
	}
}
function applyColorCell(){
	let reservedCnt = 0

	loadReserveArr.forEach(function(reserve){
		if(reserve.year === today.getFullYear() && reserve.month === today.getMonth()+1 && reserve.date === i){
			reservedCnt++
		}
	})
	if(reservedCnt === maxOfReserveNum){
		cell.classList.add("back-color-com")
		cell.addEventListener('click', selectDateError)
	}else if(todayFixed.getFullYear() === today.getFullYear() && todayFixed.getMonth()+1 === today.getMonth()+1){
		if(todayFixed.getDay() === +cell.id){
			cell.classList.add("back-color-today")
			cell.addEventListener('click', selectDate)
		}else if(todayFixed.getDay() > cell.id){
			cell.classList.add("back-color-impos")
			cell.addEventListener('click', selectDateError)
		}else{
			cell.classList.add("back-color-pos")
			cell.addEventListener('click', selectDate)
		}
	}else if(todayFixed.getFullYear() === today.getFullYear() && todayFixed.getMonth()+1 > today.getMonth()+1){
		cell.classList.add("back-color-impos")
		cell.addEventListener('click', selectDateError)
	}else if(todayFixed.getFullYear() > today.getFullYear()){
		cell.classList.add("back-color-impos")
		cell.addEventListener('click', selectDateError)
	}else{
		cell.classList.add("back-color-pos")
		cell.addEventListener('click', selectDate)
	}
}
function changeBackColorClicked(e){
	const cells = document.querySelectorAll(`.${e.target.classList[0]}`)
	for(let cell of cells){
		cell.classList.remove("back-color-clicked")
	}
	e.target.classList.add("back-color-clicked")
}
function prevCalendar(){
	today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate())
	buildCalendar()
}

function nextCalendar(){
	today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate())
	buildCalendar()
}

let isSelectDate = false
function selectDate(e){
	changeBackColorClicked(e)

	selectedYear = today.getFullYear()
	selectedMonth = ( 1 + today.getMonth() )
	selectedDate = e.target.id

	showDate.innerText = selectedYear + '년 ' + selectedMonth + '월 ' + selectedDate + '일'

	selectedDate = selectedDate >= 10 ? selectedDate : '0' + selectedDate
	selectedMonth = selectedMonth >= 10 ? selectedMonth : '0' + selectedMonth
	selectedYMD = selectedYear + "-" + selectedMonth + "-" + selectedDate
	// console.log(selectedYear, selectedMonth, selectedDate, selectedYMD)

	showDate.style.display ='block'
	selectTimeBox.style.display ='none'
	timeTableWrap.style.display ='block'
	timeTableMaker(selectedMonth, selectedDate)

	if(isSelectDate && isSelectTime){
		initSelectDetails()
		isSelectTime = false
		showResultBox.style.display = 'flex'
		btnTicketAdd.style.display = 'none'
	}
	isSelectDate = true
}
function selectDateError(){
	alert('예약이 완료된 날짜입니다.')
}




function isReserveTime(reserve){
	return reserve.dateTotal === selectedYMD && reserve.time === inputCellText
}

function timeTableMaker(selectedMonth, selectedDate){
	row = null
	month = selectedMonth
	date = selectedDate

	while(timeTable.rows.length > 0){
		timeTable.deleteRow(timeTable.rows.length-1)
	}

	for (i = 0; i < endTime - startTime; i++){
		cellTime = startTime*1 + i
		cellStartTimeText = cellTime + ":00"
		cellEndTimeText = (cellTime + 1) + ":00"
		inputCellText = cellStartTimeText + " ~ " +  cellEndTimeText
				
		row = timeTable.insertRow()
		cell = row.insertCell()
		cell.setAttribute('id', cellTime)
		cell.innerHTML = inputCellText
		cell.className = 'cell-time'

		if(loadReserveArr.find(isReserveTime)){
			cell.classList.add("back-color-com")
			cell.addEventListener('click', selectTimeError)
		}else{
			cell.classList.add("back-color-pos")
			cell.addEventListener('click', selectTime)
		}
	}
}

let isSelectTime = false
function selectTime(e){
	if(isSelectTime){
		if(!e.target.className.includes("back-color-clicked")){
			initSelectDetails()
		}
	}
	isSelectTime = true

	changeBackColorClicked(e)
	showDetailsModal()
	selectedTime = e.target.innerText
	// console.log(selectedYear, selectedMonth, selectedDate, selectedYMD, selectedTime)
}
function selectTimeError(){
	alert('예약이 완료된 시간입니다.')
}


function showDetailsModal(){
    document.body.style.overflow = 'hidden'
	modalDetails.style.zIndex = '6'
	modalDetails.style.opacity = '1'
	detailsCheck()
}
function detailsCheck(){
	const detailsObject = {
		type: null, 
		discount: [], 
		option: [], 
		amount: null, 
		price: null
	}
	let totalPrice = 0
	let discountPrice = 0
	let optionPrice = 0
	let amountSelected = null

	for(let detailsInput of detailsInputs){
		if(detailsInput.checked){
			switch(detailsInput.name){
				case 'type':
					detailsObject.type = detailsInput.value
					typePrice = detailsType[detailsInput.value]
					break;
				case 'discount':
					detailsObject.discount.push(detailsInput.value)
					discountPrice = discountPrice + detailsDiscount[detailsInput.value]
					break;
				case 'option':
					detailsObject.option.push(detailsInput.value)
					optionPrice = optionPrice + detailsOption[detailsInput.value]
					break;
			}
		}else if(detailsInput.name === 'amount'){
			detailsObject.amount = detailsInput.valueAsNumber
			amountSelected = detailsInput.valueAsNumber
		}
	}
	totalPrice = (typePrice + discountPrice + optionPrice) * amountSelected
	detailsObject.price = totalPrice
	detailsTotal.innerText = `합계: ${totalPrice.toLocaleString()}원`
	detailsObjectCon = detailsObject
}

let detailsObjectCon = null
let ticketIdNum = 0

function selectDetails(e){
	document.body.style.overflow = 'visible'
	modalDetails.style.zIndex = '-5'
	modalDetails.style.opacity = '0'
	showResultBox.style.display = 'none'
	btnTicketAdd.style.display = 'block'

	if(e.target.className.includes('check')){
		ticketIdNum++
		detailsObjectCon["ticketId"] = ticketIdNum
	
		saveTempDetails()
		makeTicket()
		calcTotal()
		if(isTicketModify){
			delTicket(findTicketSelected(ticketIdSelected))
			isTicketModify = false
		}
	}else if(e.target.className.includes('cancle')){

	}
}
function initSelectDetails(){
	alert('예약 시간을 변경합니다. 세부 옵션을 다시 선택해주세요.')
	const ticketContainers = reserveSelect.querySelectorAll('.ticket-container')
	for(let ticketContainer of ticketContainers){
		ticketContainer.remove()
		tempDetailsArr = []
		calcTotal()
	}
}
function saveTempDetails(){
	tempDetailsArr.push(detailsObjectCon)
}
function makeTicket(){
	const ticketDiv = document.createElement('div')
	ticketDiv.className = "ticket-container"
	ticketDiv.ticketId = ticketIdNum
	ticketDiv.innerHTML = `
		<div class="ticket-top">
			<div class="ticket-value type">${transdetailsType[detailsObjectCon.type]}</div>
			<div class="ticket-value price total">${detailsObjectCon.price.toLocaleString()} 원</div>
		</div>
		<div class="ticket-middle">
			<div>
				<div class="ticket-value type-price">${transdetailsType[detailsObjectCon.type]} <b>${detailsType[detailsObjectCon.type].toLocaleString()} 원</b></div>
				<div class="ticket-value date">${selectedYMD} (${getDayOfWeek(selectedYMD)})</div>
				<div class="ticket-value time">${selectedTime}</div>
			</div>
			<div class="ticket-value amount">${detailsObjectCon.amount} 매</div>
		</div>
		<div class="ticket-bottom">
			${makeTicketOption()}
		</div>
		<div class="ticket-btns">
			<button class="btn-ticket modify">수정</button>
			<button class="btn-ticket del">삭제</button>
		</div>
	`
	ticketBox.appendChild(ticketDiv)
	const btnsTicket = document.querySelectorAll('.btn-ticket')
	for(let btnTicket of btnsTicket){
		btnTicket.addEventListener('click', controlTicket)
	}
}
function makeTicketOption(){
	let options = ''
	if(detailsObjectCon.option[0] || detailsObjectCon.discount[0]){
		detailsObjectCon.option.forEach(function(option){
			options = options + `<div class="ticket-value option-price">• ${transdetailsOption[option]} <b>${detailsOption[option].toLocaleString()} 원</b></div>`
		})
		detailsObjectCon.discount.forEach(function(discount){
			options = options + `<div class="ticket-value option-price">• ${transdetailsDiscount[discount]} <b>${detailsDiscount[discount].toLocaleString()} 원</b></div>`
		})
	}else{
		options = `<div class="ticket-value option-price">• 추가 할인, 옵션 없음</div>`
	}
	return options
}
function getDayOfWeek(yyyyMMdd){
    const dayOfWeek = new Date(yyyyMMdd).getDay(); 
    const transDayOfWeek = {0: '일', 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토'}
    return transDayOfWeek[dayOfWeek]
}
function addMoreTicket(){
	showDetailsModal()
}
function calcTotal(){
	let totalPrice = 0
	tempDetailsArr.forEach(function(tempDetails){
		totalPrice = totalPrice + tempDetails.price
	})
	totalPriceBox.innerText = `합계: ${totalPrice.toLocaleString()} 원`
	totalPriceResult = totalPrice
}
function delTicket(tempDetails){
	const ticketContainers = reserveSelect.querySelectorAll('.ticket-container')
	for(let ticketContainer of ticketContainers){
		if(ticketContainer.ticketId === tempDetails.ticketId){
			ticketContainer.remove()
		}
	}
	for(let i = 0; i < tempDetailsArr.length; i++){
		if(tempDetailsArr[i] === tempDetails){
			tempDetailsArr.splice(i, 1);
			i--;
		}
	}
	calcTotal()
}
function findTicketSelected(ticketIdSelected){
	let TicketSelected = 
	tempDetailsArr.find(function(tempDetails){
		return tempDetails.ticketId === ticketIdSelected
	})
	return TicketSelected
}
let isTicketModify = false
let ticketIdSelected =  null
function controlTicket(e){
	if(e.target.className.includes('modify')){
		ticketIdSelected = e.target.parentElement.parentElement.ticketId
		isTicketModify = true
		showDetailsModal()
	}else if(e.target.className.includes('del')){
		const ticketIdSelected = e.target.parentElement.parentElement.ticketId
		delTicket(findTicketSelected(ticketIdSelected))
	}else if(e.target.className.includes('add')){
		addMoreTicket()
	}
}

function showPaymentModal(){
    document.body.style.overflow = 'hidden'
	modalPayment.style.zIndex = '6'
	modalPayment.style.opacity = '1'
	loadSelectedTickets()
	removeTicketsbtns()
	loadSelectedPrice()
}
function loadSelectedTickets(){
	const ticketContainers = reserveSelect.querySelectorAll('.ticket-container')
	ticketBoxPayment.innerHTML = ''

	for(let ticketContainer of ticketContainers){
		const clonedTicket = ticketContainer.cloneNode(true)
		ticketBoxPayment.append(clonedTicket)
	}
	
}
function removeTicketsbtns(){
	const ticketBtnsPayment = ticketBoxPayment.querySelectorAll('.ticket-btns')
	for(let ticketBtnPayment of ticketBtnsPayment){
		ticketBtnPayment.remove()
	}
}
function loadSelectedPrice(){
	paymentTotal.innerText = `${totalPriceResult.toLocaleString()} 원`
}


function controlPayment(e){
    document.body.style.overflow = 'visible'
	modalPayment.style.zIndex = '-5'
	modalPayment.style.opacity = '0'

	if(e.target.className.includes('check')){
		let paymentName = null
		let paymentContact = null
		let paymentEmail = null
		for(let paymentInput of paymentInputs){
			switch(paymentInput.name){
				case 'name':
					paymentName = paymentInput.value
					break;
				case 'contact':
					paymentContact = paymentInput.value
					break;
				case 'email':
					paymentEmail = paymentInput.value
					break;
			}
		}
		const reservationInfo = {
			id: `${selectedYear}` + `${selectedMonth}` + `${selectedDate}` + selectedTime.split(':')[0],
			name: paymentName,
			contact: paymentContact,
			email: paymentEmail,
			year: selectedYear,
			month: Number(selectedMonth),
			date: Number(selectedDate),
			dateTotal: selectedYMD,
			time: selectedTime,
			details: tempDetailsArr,
			totalprice: totalPriceResult
		}
		if(!localStorage.getItem('reservation')){
			localStorage.setItem('reservation', JSON.stringify([reservationInfo]))
		}else{
			let renewReserve = JSON.parse(localStorage.getItem('reservation'))
			renewReserve.push(reservationInfo)
			localStorage.setItem('reservation', JSON.stringify(renewReserve))
		}
		alert('결제가 완료되었습니다.')
		location.reload(true);
	}else if(e.target.className.includes('cancle')){
		console.log('취소')
	}
}


for(let btnDetails of btnsDetails){
	btnDetails.addEventListener('click', selectDetails)
}
for(let detailsInput of detailsInputs){
	detailsInput.addEventListener('input', detailsCheck)
}
btnTicketAdd.addEventListener('click', controlTicket)
btnReserve.addEventListener('click', showPaymentModal)
for(let btnPayment of btnsPayment){
	btnPayment.addEventListener('click', controlPayment)
}