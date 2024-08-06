### 배운점

백엔드 스키마 DTO를 타입스크립트 형태로 가져올 수 있다. penapi-typescript는 스웨거를 읽고 백엔드의 응답을 typescript형태로 바꿔준다.

```
npx openapi-typescript ${schema docs url} --output schema.ts
```

이제 axios에 제네릭 형태로 APIRequest,APIResponse를 걸어줄 수 있다. 이러면 응답 값이 자동으로 추론되어서 너무 좋은 듯 하다!

```ts
import { components } from '../../../../schema'
import { useInfiniteQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']
```

쿼리와 mutation은 1대1로 대응하는게 바람직한 것 같다. query함수와 쿼리,mutation을 둘 다 export해서 쓸 수 있게 하면 더 응집도 있지 않을까

맵을 쓰는 건 너무 어렵다. 코드가 더러워지고 useEffect가 자연스럽게 비대해 질 수밖에 없는데, 방법을 찾다가 DI를 개념을 봤다.

구글 맵 -> 네이버 맵으로 네이버 맵 -> 카카오 맵으로 요구사항이 바뀌면 자연스럽게 더러워진 코드를 뜯을 수 밖에 없다.

이를 해결하려면 적절한 추상화와 지도에 대한 DI를 주입해주면 되는데, 하나하나 풀어가보자..!

에러바운더리와 Suspense로 컴포넌트를 무지성 감싸는 게 좋은걸까? 내가 효과적으로 에러를 처리하고있는건지? 선언적이라는 함정에 빠져서 불필요하게 래핑을 하는게 아닐지 고민이 된다.


무한스크롤은 이제 익숙해졌다..뿌듯(!)

tanstack-router를 써봤다. type-safe하게 라우팅을 만들어주고 적절히 타입 추론, 타입 에러를 뱉어줘서 너무 편하고 좋다. 그리고 query-string형태로 넘길 수도 있고, 선언적으로 private-route처리도 할 수 있어서 좋다

아마 다음 react의 router는 tanstack-router가 짱을 먹지 않을까..?
