export const noticeArr = [
]
const makeNotice = 86
for(let n=1; n<makeNotice+1; n++){
    const noticeEx = {title: `공지 사항 제목 ${n}`, date: `2024-03-${n}`, content: `공지사항 ${n}의 내용`, noticeIdNum: n}
    noticeArr.push(noticeEx)
}

