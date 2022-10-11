import createDebounce from '@/utils/createDebounce';

describe('디바운스 함수 설명', () => {
    /**
     * 디바운스란?
     * 디바운스는 같은 이벤트가 여러번 발생할 때 묶어서 한번만 실행하도록 하는 기술입니다.
     * 예를 들어 타이핑할때 번역 이벤트를 건다면, h -> he -> hel -> hell -> hello 5번의 번역 request가 발생합니다.
     * 당연히 서버 비용 뿐만 아니라 API 비용 측면에서 좋지 않기 때문에 이런 경우 debounce를 걸면 좋습니다.
     */

    jest.useFakeTimers(); // 테스트에서 실제로 setTimeout을 걸고 기다릴 순 없기 때문에 가짜 타이머로 시간을 빨리감기위한 장치입니다.
    it('createDebounce 사용 방법', () => {
        let count = 0;
        const LATENCY = 200; // 200ms
        function increase() {
            count++;
        }

        /**
         * createDebounce 함수를 통해 debounce 함수를 생성합니다.
         * 아래 debounce 함수는 200ms 사이에 이벤트가 발생한다면 이전 이벤트를 취소하고 새 이벤트를 등록합니다.
         */
        const debounce = createDebounce(increase, LATENCY);

        /**
         * count를 1씩 증가시키는 debounce를 100ms마다 1번씩, 10번 실행시켜보겠습니다.
         */
        for (let i = 1; i <= 10; i++) {
            setTimeout(() => {
                debounce();
            }, 100 * i);
        }

        /**
         * 2초 뒤에 count는 어떻게 될까요
         * 결과적으로 count는 1이 됩니다. 디바운스가 걸려서 200ms 이전에 들어오는 요청은 전부 무시되고 1번만 실행된거죠.
         */
        setTimeout(() => {
            expect(count).toBe(1);
        }, 2000);

        jest.runAllTimers();
    });
});
