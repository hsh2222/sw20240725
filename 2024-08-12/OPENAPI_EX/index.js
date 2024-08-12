const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// 웹 페이지 URL 설정
const url = 'https://designlog.org/2513060';

// HTML 가져오기
async function fetchHTML(url) {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.error('Error fetching the HTML:', error);
    }
}

// 이미지 다운로드 함수
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        responseType: 'stream',
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// 데이터 추출 및 이미지 저장
async function extractData() {
    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    // 기사 제목 추출
    const title = $('title').text();  // 보통 'title' 태그에서 페이지 제목을 가져올 수 있습니다.
    console.log('Title:', title);

    // 이미지 URL 추출
    const images = [];
    $('img').each((index, element) => {
        let imgUrl = $(element).attr('src');
        if (imgUrl && !imgUrl.startsWith('http')) {
            // 상대 경로일 경우, 절대 경로로 변환
            imgUrl = new URL(imgUrl, url).href;
        }
        if (imgUrl) {
            images.push(imgUrl);
        }
    });

    // 이미지 다운로드
    for (let i = 0; i < images.length; i++) {
        const imgUrl = images[i];
        const imgPath = path.join(__dirname, 'download', `image${i}.jpg`); // 이미지 파일을 'download' 폴더에 저장
        await downloadImage(imgUrl, imgPath);
        console.log(`Image ${i + 1} downloaded: ${imgPath}`);
    }

    // 기사 내용 추출
    const content = $('.post-content').text();  // 예시로 '.post-content' 클래스를 사용했습니다. 실제로 구조를 확인하세요.
    console.log('Content:', content);
}

extractData();
