# gomguk-viewer-fe

곰국 뷰어 웹 프론트엔드 레포입니다.

**PDF Viewer, 번역기, 메모장으로 구성된 웹앱을 제공합니다** 

데모)
https://ssu-memorier.github.io/gomguk-viewer-fe/

로그인, 서버 기능들은 공모전이 종료되며 클라우드 지원이 끝나 이용이 불가능합니다만 비로그인 유저를 위한 기능(pdf viewer, 메모장)은 살아있으니 사용해보실 수 있습니다.

## 개발 내용

### 기술 & 라이브러리 선택
#### 프레임워크 - Vue3
컴포지션 API를 통해 기존 option api보다 가독성 좋은 코드를 작성할 수 있을 것이라 생각했고 대용량의 PDF를 로딩하는 경우 성능상 하자가 있을 수 있을 것이라 생각했기에 성능상 향상된 부분이 있는 vue3를 선택했습니다. 또한 코드 리뷰 과정에 백엔드 팀원도 포함할 계획이었기에 프론트를 전혀 모르는 팀원들과 소통하기에도 SFC 형식의 뷰 컴포넌트가 좋을 것이라 생각했습니다.

React 등의 다른 프레임워크를 사용하지 않은 것은 Vue로 충분히 구현할 수 있는 내용이었고 프로젝트의 시간 여유가 많지 않았기 때문에(약 3달) 가장 숙련도가 높은 프레임워크를 선택해야겠다고 생각했습니다. 

사소한 부분이지만 나중에 코드를 구현하면서 컴포넌트를 객체처럼 다른 컴포넌트 내에서 사용할 수 없음을 알고 조금 아쉬웠습니다. 

#### Typescript
프론트엔드를 혼자서 개발하기에 사소한 타입에러 등을 허용하면서 코드 품질이 낮아질 수 있을 것 같다 생각했습니다. 또한, 자바스크립트를 모르는 팀원들과 코드 리뷰를 하기 위해서 타입이 제공되는 편이 코드를 설명하거나 가독성에서 좋을 것이라 생각했기에 타입스크립트를 선택했습니다.

#### PDF.js
https://mozilla.github.io/pdf.js/  
PDF 뷰어 구현을 위해 사용할 수 있는 방법들을 조사한 결과 PDF.js 외의 선택지는 없어 보였고, PDF.js가 꽤 준수한 뷰어였기 때문에 PDF.js를 사용하게 되었습니다.

다만 추후 개발하면서 디테일한 부분에서 커스텀이 불가능해 아쉬움과 한계를 느꼈고, PDF의 기능을 강화하기 위해선 결국 PDF.js를 대체할 별도의 라이브러리 개발이 필요함을 느꼈습니다. 하지만 이는 규모도 크고 시간관계상 불가능할 것으로 보여 PDF.js 위에 다른 화면을 겹쳐 사용하는 방식으로 해결했습니다.

#### editor.js
https://editorjs.io/  
notion과 같은 메모 작성 경험을 주기 위해 블록형 메모장 라이브러리를 찾던 중 발견하게 되어 사용한 라이브러리입니다. 라이브러리의 완성도가 조금 떨어져 아쉬운 라이브러리입니다. 기본적인 기능은 제공하지만 노션과 비교해 디테일한 부분들이 떨어져 아쉬었습니다. 하지만 API를 연결해 확장이 가능하다는 점이 매력적인 라이브러리입니다. 개인적으로 좀 더 발전하면 기대될 것 같습니다.

https://github.com/dev2820/simple-editorjs-latex   
논문 뷰어라는 점에서 latex는 유저에게 필수적인 기능이라 생각했고, latex블럭을 찾아본 결과 마음에 드는 latex 블럭이 없어 직접 구현했습니다.

### 주요 구현 내용

#### Selection시 블링킹(blinking) 현상 해결
![blink1](https://user-images.githubusercontent.com/40891497/210165480-cbc1cc29-51a7-4ac8-a490-82c5b7db3ca8.gif)
![blink-solve1](https://user-images.githubusercontent.com/40891497/210165501-4a28d1f3-7711-48ca-b8f5-079ae8c4aa7a.gif)  
(좌 블링킹 현상, 우 블링킹 현상 해결)

PDF.js를 사용하면서 텍스트 selection을 생성시 왼쪽 사진처럼 selection이 번쩍이는 현상이 있음을 확인했고 유저 경험에 좋지 않게 생각되어 해결할 방법을 구상하게 되었습니다. 블링킹 현상이 발생하는 것은 마우스가 텍스트 위가 아니라 빈 공간을 가리킬 때 `window.getSelection` 이 마지막 노드를 제대로 찾지 못해 발생하는 문제임을 확인했습니다.

이를 해결하기 위해 **selection을 표시할 별도의 레이어를 PDF위에 덮어 씌우는 방식**을 이용하게 되었습니다. 

![image](https://user-images.githubusercontent.com/40891497/210165781-075aef7b-856b-41c5-b044-a3c1428d4cb6.png)

PDF.js에서 한 문장은 하나의 `<span>`으로 구성되는데, 한 줄에 속한 span들을 모으고 이 span들의 크기 정보를 얻어 한 줄의 QuadPoints([left,top,right,bottom]형식의 좌표 표현 방식)를 얻은 뒤 canvas에 QuadPoints를 Rect로 그리는 방식을 사용합니다.

#### pdf 확대/축소시 깜빡임 문제 해결
![plusminus1](https://user-images.githubusercontent.com/40891497/210165839-b434d5a3-dbe2-43ee-989c-cd62aa48aa4d.gif)

PDF.js의 scale을 조정하는 과정에서 위 gif처럼 화면이 깜빡이는 현상이 나타났습니다. 이 현상을 해결하기 chrome과 edge 브라우저에서 pdf를 출력하는 방식을 관찰했습니다.

![chromeedge](https://user-images.githubusercontent.com/40891497/210165962-db74461d-ee26-4a55-b0aa-8898133ec684.gif)
(chrome과 edge 브라우저에서 PDF를 확대/축소 시)

위와 같은 방식으로 PDF Page를 확대/축소 하기 위해 이전 PDF는 scale만 변경해 남겨두고 (해상도가 깨지도록), 새로운 scale이 적용된 PDF 랜더링이 끝나면 화면에 표시하는 방식을 적용했습니다. `원본 → 확대된(하지만 깨지는) 캔버스 → 새로 랜더링한 캔버스` 순으로 덮어 씌운다 생각하면 됩니다. 

결과적으로 깜빡이는 현상을 제거할 수 있었습니다.  
![scale](https://user-images.githubusercontent.com/40891497/210166024-69886c75-5d65-4393-9653-2cd50837fa4f.gif)

#### PDF 확대/축소 최적화 - lazy loading 적용
PDF의 크기가 커지면 확대/축소시 렌더링 시간이 크게 늘어나는 문제를 발견했습니다. 구글 리서치에서 읽은 정보에 따르면 웹사이트의 로딩 시간은 3초 이상일 때 이탈률이 크게 늘어난다고 알고 기 때문에 문제를 해결하고자 했습니다. 

먼저 문제를 명확히 하기 위해 측정 기준이될 PDF를 선정했습니다. 816p 크기의 PDF였고, 이 PDF를 확대/축소 시 약 1분 정도의 렌더링 시간이 소요되었습니다. 크롬 개발자 도구를 통해 자세한 시간 소요를 확인한 결과 대부분의 시간이 스크립트에 소요되는 것을 볼 수 있었습니다.
![image](https://user-images.githubusercontent.com/40891497/210166416-449d53a3-4d38-4363-9509-98e6bd47758d.png)

이렇게 스크립트 비용이 많이 발생하는 것은 스케일 변경을 모든 페이지에 한번에 불러오려하기 때문이라고 생각했고, 보이는 페이지에 대해서만 스케일을 변경하도록 **lazy loading을 적용하면 스크립트 비용을 크게 줄일 수 있을 것**이라 가설을 세웠습니다. 그리고 lazy loading을 적용하기 위해 `IntersectionObserver`를 각 페이지에 적용하고 viewport에 포함되는 페이지에 대해서만 확대/축소 과정을 수행하도록 했습니다. 

![image](https://user-images.githubusercontent.com/40891497/210166480-606dd163-fc07-495f-a484-ebc8dc996f0b.png)
결과적으로 큰 크기의 PDF에서 스크립트,렌더링 비용을 90% 이상 줄일 수 있었습니다.

#### Hit Test 비용 최적화 - `content-visibility:auto`
곰국 뷰어의 화면은 PDF viewer영역과 번역기 영역으로 나누어져 있는데, 이 둘의 크기를 조절할 수 있습니다. 특정 상황에서 이 화면을 조절할 때 프레임 드랍이 관측되어 성능을 측정하게 되었는데요. 테스트 방식은 아래와 같이 8page 크기의 PDF를 불러와 번역기 영역의 크기를 위아래로 10회 바꾸는 방식으로 진행했습니다.

![example](https://user-images.githubusercontent.com/40891497/210166599-81615507-bc60-403d-b15c-e38ad742f1d9.gif)  

![image](https://user-images.githubusercontent.com/40891497/210166717-77058fb5-4a39-4896-898e-2aa45f22fe5d.png)  
테스트 결과 렌더링 시간이 크게 소요되고 있음을 확인할 수 있었는데요. 

![image](https://user-images.githubusercontent.com/40891497/210166729-e4cf39fe-5406-44e9-8876-0b89249e1dcf.png)  
자세한 내용을 보면 Hit Test 비용이 2441ms로 큰 비중을 차지함을 알 수 있었습니다. Hit Test 비용은 렌더러 프로세스가 유저의 마우스(또는 터치) 이벤트가 어떤 DOM 요소에서 발생했는지 확인하는 비용으로 이 Hit Test 비용이 크게 증가한 것으로 미루어보아 다음 가설을 세울 수 있었습니다.

가설) 보이지 않는 영역의 DOM Tree까지 Hit Test가 수행되어 Hit Test 비용이 크게 측정되었다. 

따라서 이를 해결하기 위해 css의 `content-visibility` 속성을 적용했습니다. 이 속성은 화면에 보이지 않는 영역은 페인팅 작업을 생략해 렌더링 성능을 최적화할 수 있는 속성입니다. 각 PDF 페이지들에 `content-visibility:auto`를 설정한 뒤 다시 한번 테스트를 진행했습니다.

![image](https://user-images.githubusercontent.com/40891497/210166935-dc382b7c-6fb2-4088-a18e-f4907d193a0f.png)  
![image](https://user-images.githubusercontent.com/40891497/210166943-5d149a61-8f75-4833-a0a2-09a594ef7252.png)  
 
결과적으로 Hit Test 비용이 2441ms -> 185ms로 크게 감소한 것을 확인할 수 있었습니다.

## 개발자
@dev2820

## 관련 레포
### editorjs-test
곰국 뷰어에서 사용한 editor.js의 테스트 레포입니다.
https://github.com/ssu-memorier/editorjs-test

### PDF 구현가능성 테스트
https://jsfiddle.net/dev2820/b7eLsv9q/50/

## 사용 스택
- Vue3 (with Composition API)
- Typescript
- Pinia
- SCSS
- PDF.js
- editor.js



