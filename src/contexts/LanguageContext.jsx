import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    ko: {
        nav: {
            culture: '문화유산',
            shop: '뮤지엄샵',
            members: '멤버스',
            faq: 'FAQ',
            cart: '장바구니',
            login: '로그인',
            logout: '로그아웃',
        },
        home: {
            heroTitle: '한국의 아름다움을 만나다',
            heroSubtitle: '천년의 역사와 문화가 살아숨쉬는 곳으로 여러분을 초대합니다.',
            heroCTA: '문화유산 둘러보기',
            sectionHeritage: '추천 문화유산',
            sectionGoods: '인기 굿즈',
            viewAll: '전체보기',
            palaceTitle: '서울의 5대 궁궐',
            palaceDesc: '조선 왕조의 역사가 살아 숨 쉬는 서울의 5대 궁궐을 소개합니다.\n경복궁, 창덕궁, 창경궁, 덕수궁, 경희궁의 아름다움을 만나보세요.',
        },
        cart: {
            title: '장바구니',
            empty: '장바구니가 비어있습니다.',
            goShop: '쇼핑하러 가기',
            remove: '삭제',
            total: '총 결제금액',
            checkout: '구매하기',
            notReady: '준비 중입니다.',
        },
        heritage: {
            title: '한국의 문화유산',
            subtitle: '천년의 역사가 살아숨쉬는 아름다운 공간을 만나보세요.',
            intro: '소개',
            location: '위치',
            hours: '관람 시간',
            relatedGoods: '관련 굿즈',
            gyeongbokgungDetail: `경복궁은 1395년 조선을 건국한 태조 이성계가 창건한 법궁(法宮)으로, '새 왕조가 큰 복을 누리며 번영하라'는 의미를 담고 있습니다. 임진왜란으로 불타 없어졌다가 1867년(고종 4년)에 재건되었으나, 일제강점기 훼손을 거쳐 1990년대부터 복원되었습니다. 현재 복원된 경복궁은 웅장한 정문인 광화문을 시작으로, 왕의 업무 공간인 근정전, 왕과 왕비의 침전 등이 있으며, 조선의 역사와 문화를 담고 있는 서울의 대표적인 궁궐입니다.

경복궁 소개
창건 및 재건: 1395년 조선 제1의 법궁으로 건립되었으나, 1592년 임진왜란 때 소실되었습니다. 270여 년 후인 1867년(고종 4년)에 다시 지어졌습니다.
의미: '경복(景福)'은 '새 왕조가 큰 복을 누려 번영할 것'이라는 의미를 담고 있습니다.
구조: 북악산을 주산으로 넓은 지형에 건물을 배치했습니다. 정문인 광화문 앞으로는 육조거리가 펼쳐져 한양의 중심이었습니다. 왕이 거처하며 나랏일을 보던 정궁으로, 중심부 건축물들은 기하학적 질서와 대칭 구조를 이루고 있습니다.

주요 전각:
광화문: 경복궁의 정문으로, '빛의 정문'이라는 뜻을 가집니다.
근정전: 왕의 즉위식, 외국 사신 접견 등 국가의 중요한 의식을 치르는 곳입니다. 웅장한 2층 건물로 위엄을 나타냅니다.
사정전: 왕이 신하들과 정무를 의논하던 곳입니다.
강녕전: 왕이 거처하던 침전입니다.
교태전: 왕비가 거처하던 침전입니다.
건청궁: 고종이 만든 곳으로, 명성황후 시해 사건이 발생한 비운의 장소이기도 합니다.

복원: 일제강점기 훼손을 거쳐 1990년대부터 본격적인 복원 사업이 진행되었습니다. 1995~1997년 사이에는 조선총독부 건물이 철거되었고, 1997년 이후에는 광화문, 흥례문, 건청궁 등이 복원되었습니다.`,
            changdeokgungDetail: `창덕궁은 1405년 태종 때 경복궁의 이궁으로 세워졌으며, 자연 지형과 조화를 이룬 가장 한국적인 궁궐로 평가받습니다. 임진왜란 후 조선 왕조의 법궁 역할을 했으며, 자연스러운 건축과 조경이 돋보여 1997년 유네스코 세계유산으로 지정되었습니다. 주요 전각으로는 인정전, 선정전, 대조전 등이 있으며, 특히 넓은 후원(비원)은 왕실의 휴식과 학문, 사색의 공간으로 중요했습니다.

창덕궁의 특징
자연과의 조화: 주변 지형을 그대로 살려 건물을 배치하여 인위적이지 않고 자연스러운 아름다움을 보여줍니다.
오랜 역사: 임진왜란 이후 약 258년간(1610년~1868년) 조선의 법궁 역할을 했습니다.
유네스코 세계유산: 자연과 조화를 이룬 건축과 조경으로 1997년 세계유산으로 등재되었습니다.
동궐: 창경궁과 함께 동쪽에 있어 '동궐'이라고 불렸습니다.

주요 전각 및 시설
돈화문: 가장 오래된 궁궐 정문입니다.
인정전: 국가의 중요 행사가 열리던 곳으로, 품계석이 있습니다.
선정전: 왕과 신하들이 국사를 논하던 곳입니다.
대조전 및 희정당: 왕과 왕비가 생활하던 공간입니다.
후원(비원): 왕실의 휴식과 학문을 위한 정원으로, 부용정, 애련정, 존덕정 등 아름다운 정자들과 연못, 류천(인조가 만든 인공 폭포) 등이 있습니다.
연경당: 민가 형식으로 지어진 사랑채로, 연회가 열리기도 했습니다.

가치
한국적인 미: 자연과 어우러진 건축 방식과 아름다운 후원 경관은 한국 건축의 정수를 보여줍니다.
왕실의 생활상: 다양한 전각과 후원 시설들은 왕실의 일상생활과 정치, 학문 활동을 엿볼 수 있게 해줍니다.
지도자의 역할: 후원 속 농사 체험(청의정), 학문을 위한 규장각 등은 진정한 지도자가 되기 위한 왕의 노력을 엿볼 수 있는 공간입니다.`,
            changgyeonggungDetail: `창경궁은 1483년 성종이 세 분의 대비(세조, 덕종, 예종의 비)를 모시기 위해 옛 수강궁 터에 확장·건립한 궁궐입니다. 창덕궁과 연결되어 있어 '동궐(東闕)'이라 불리며 하나의 궁역을 형성했습니다. 일제강점기에 동물원과 식물원으로 격하되는 아픔을 겪었으나, 이후 복원 사업을 통해 본래의 모습을 되찾아가고 있습니다.

창경궁 소개
창건 및 변천: 1483년(성종 14년) 왕실의 어른들을 편안히 모시기 위한 목적으로 건립되었습니다. 임진왜란 때 소실되었다가 광해군 때 재건되었습니다.
의미: '경사(慶)가 창성(昌)하라'는 뜻으로, 왕실의 번영과 웃어른의 안녕을 기원하는 의미입니다.
구조: 정치 공간보다는 왕실 가족의 생활 공간(내전)이 더 발달한 구조입니다. 다른 궁궐들이 남향인 것과 달리, 정문과 정전이 동쪽을 바라보고 있는 것이 특징입니다.

주요 전각:
홍화문: 창경궁의 정문으로, 왕이 백성들을 만나거나 쌀을 나누어 주던 장소이기도 했습니다.
명정전: 현존하는 조선 궁궐의 정전 중 가장 오래된 건물(광해군 때 재건)입니다.
통명전: 왕비의 침전으로, 내전 건물 중 가장 으뜸가는 건물입니다.
자경전 터: 정조가 어머니 혜경궁 홍씨를 위해 지었던 건물이 있던 자리입니다.

복원: 1909년 일제에 의해 동·식물원인 '창경원'으로 격하되고 벚꽃놀이 장소로 변질되었으나, 1980년대부터 복원 사업을 시작하여 벚나무를 뽑고 동물원을 이전하며 '창경궁'의 이름을 되찾았습니다.`,
            deoksugungDetail: `덕수궁은 본래 성종의 형인 월산대군의 저택이었으나, 임진왜란 때 선조가 임시 거처로 사용하며 궁궐의 역할을 하게 되었습니다. 구한말 고종이 대한제국을 선포하고 황궁으로 삼았던 곳으로, 전통 목조 건축과 서양식 석조 건축이 공존하는 독특한 경관을 자랑합니다.

덕수궁 소개
창건 및 변화: 처음에는 '경운궁'이라 불렸으나, 1907년 고종이 순종에게 양위한 뒤 이곳에 머물면서 고종의 장수를 비는 뜻으로 '덕수궁'이라 개칭되었습니다.
의미: '덕(德)을 누리며 장수(壽)하라'는 의미를 담고 있습니다.
구조: 서울 도심 한복판에 위치하며, 전통적인 전각들과 근대식 서양 건축물이 함께 있어 조선 후기와 근대의 역사를 동시에 보여줍니다.

주요 전각:
대한문: 덕수궁의 정문으로, 본래 이름은 대안문이었으나 이후 바뀌었습니다. 현재 서울광장과 마주하고 있습니다.
중화전: 대한제국 황제의 정전으로, 국가의 주요 의식을 치르던 곳입니다.
석조전: 서양식 석조 건물로, 고종이 고관이나 외국 사신을 접견하던 곳입니다. 근대 건축의 대표작입니다.
정관헌: 고종이 커피를 마시며 외교 사절들과 연회를 즐기던 동서양 절충식 건물입니다.

역사적 의의: 을사늑약이 체결된 비극의 현장이기도 하며, 대한제국의 근대화 의지와 좌절이 서린 역사의 공간입니다.`,
            gyeonghuigungDetail: `경희궁은 1617년 광해군 때 건립된 궁궐로, 창덕궁과 함께 조선 후기 양대 궁궐 체제의 한 축을 담당했습니다. 도성의 서쪽에 있어 '서궐(西闕)'이라 불렸으며, 숙종과 영조가 오랫동안 머물렀던 곳입니다. 일제강점기에 건물이 철거되고 학교가 들어서는 등 가장 심하게 훼손되었으나, 일부가 복원되어 시민에게 개방되었습니다.

경희궁 소개
창건 및 훼손: 1617년(광해군 9년)에 창건되었습니다. 인조 이후 철종에 이르기까지 10명의 임금이 머물렀으나, 일제강점기에 일본인 학교(경성중학교)가 들어서며 궁궐의 흔적이 거의 사라졌습니다.
의미: '경사(慶)스럽고 빛나는(熙) 궁'이라는 의미를 가집니다.
구조: 경사지의 지형을 이용하여 건물을 배치하여 건축적 미학이 돋보였던 궁궐입니다.

주요 전각:
흥화문: 경희궁의 정문입니다. 일제에 의해 이토 히로부미 사당의 정문으로 쓰이는 등 이곳저곳 옮겨지는 수난을 겪다 다시 돌아왔습니다.
숭정전: 왕이 신하들과 조회를 하거나 궁중 연회를 베풀던 정전입니다.
자정전: 왕이 신하들과 회의를 하거나 업무를 보던 편전입니다.
태령전: 영조의 어진(초상화)을 보관하던 곳입니다.

복원: 원래 규모의 극히 일부만 복원된 상태입니다. 1980년대 발굴 조사를 시작으로 2002년부터 시민들에게 공개되었으며, 현재도 역사적 가치를 되찾기 위한 노력이 이어지고 있습니다.`,
        },
        palaces: {
            gyeongbokgung_name: '경복궁',
            gyeongbokgung_desc: '조선 왕조 제일의 법궁. 북악산 아래 광화문을 중심으로 조화를 이루는 웅장한 궁궐입니다.',
            changdeokgung_name: '창덕궁',
            changdeokgung_desc: '자연과 조화를 이루는 가장 한국적인 궁궐. 유네스코 세계문화유산입니다.',
            changgyeonggung_name: '창경궁',
            changgyeonggung_desc: '왕실의 생활 공간으로 사랑받았던 궁궐. 대온실과 야간 개장이 유명합니다.',
            deoksugung_name: '덕수궁',
            deoksugung_desc: '전통 목조 건축과 서양식 석조 건축이 조화를 이루는 근대 역사의 현장입니다.',
            gyeonghuigung_name: '경희궁',
            gyeonghuigung_desc: '조선 후기 왕들의 피우처로 사용되었던 서궐. 도심 속 호젓한 산책을 즐길 수 있습니다.',
        },
        shop: {
            title: '뮤지엄 샵',
            subtitle: '한국의 아름다움을 담은 특별한 굿즈를 만나보세요.',
            addToCart: '장바구니 담기',
            added: '장바구니에 담았습니다. 장바구니로 이동하시겠습니까?',
        },
        login: {
            title: '로그인',
            id: 'ID',
            password: '비밀번호',
            submit: '로그인',
            error: 'ID 또는 비밀번호가 올바르지 않습니다.',
            signupLink: '아직 회원이 아니신가요? 회원가입',
        },
        signup: {
            title: '회원가입',
            name: '이름',
            password: '비밀번호',
            confirm: '확인',
            phone: '전화번호',
            interests: '관심 궁',
            country: '거주 국가',
            status: '내국인/외국인',
            local: '내국인',
            foreigner: '외국인',
            placeholderCountry: '대한민국',
            submit: '가입하기',
            required: '필수 항목을 입력하세요.',
            mismatch: '비밀번호 확인이 일치하지 않습니다.',
            exists: '이미 존재하는 ID입니다.',
            success: '가입이 완료되었습니다. 로그인해 주세요.',
            loginLink: '이미 회원이신가요? 로그인',
            gender: '성별',
            male: '남성',
            female: '여성',
        },
        footer: {
            desc: '한국의 아름다운 문화유산과\n특별한 굿즈를 만나보세요.',
            menu: '메뉴',
            cs: '고객센터',
            notice: '공지사항',
            faq: '자주 묻는 질문',
            inquiry: '1:1 문의',
        },
        contact: {
            title: '문의하기',
            desc: '궁금한 점이 있으신가요? 언제든 문의해주세요.',
            name: '이름',
            email: '이메일',
            message: '내용',
            button: '보내기',
            success: '문의가 접수되었습니다.',
        },
        faq: {
            title: '자주 묻는 질문',
            subtitle: '고객님들이 자주 묻는 질문들을 모았습니다.',
            q1: '관람 시간은 어떻게 되나요?',
            a1: '각 궁궐마다 관람 시간이 다르며, 계절에 따라 변동될 수 있습니다. 자세한 내용은 각 문화유산 상세 페이지를 확인해주세요.',
            q2: '예약이 필요한가요?',
            a2: '일반 관람은 예약 없이 가능하지만, 특별 관람이나 해설 프로그램은 사전 예약이 필요할 수 있습니다.',
            q3: '주차 시설이 있나요?',
            a3: '대부분의 궁궐에는 공영 주차장이 마련되어 있으나, 주말이나 공휴일에는 혼잡할 수 있으니 대중교통 이용을 권장합니다.',
        },
        common: {
            notFound: '페이지를 찾을 수 없습니다.',
            loading: '로딩 중...',
            error: '오류',
            home: '홈으로 가기',
        },
        converter: {
            title: '온도 변환기',
            desc: '섭씨(℃)와 화씨(℉)를 간편하게 변환해보세요.',
            celsius: '섭씨 (Celsius)',
            fahrenheit: '화씨 (Fahrenheit)',
            boiling: '물이 끓습니다!',
            notBoiling: '물이 끓지 않습니다.',
            explanationTitle: '한국의 온도 단위',
            explanation: '한국에서는 온도를 측정할 때 **섭씨(℃)** 단위를 사용합니다.\n미국 등 일부 국가에서 사용하는 **화씨(℉)**와 다르니 여행 시 참고해 주세요.',
        },
        clock: {
            title: '세계 시간',
            seoul: '서울 (한국)',
            newyork: '뉴욕 (미국)',
            paris: '파리 (유럽)',
        }
    },
    en: {
        nav: {
            culture: 'Heritage',
            shop: 'Museum Shop',
            members: 'Members',
            faq: 'FAQ',
            cart: 'Cart',
            login: 'Login',
            logout: 'Logout',
        },
        home: {
            heroTitle: 'Discover the Beauty of Korea',
            heroSubtitle: 'We invite you to a place where a thousand years of history and culture come alive.',
            heroCTA: 'Explore Heritage',
            sectionHeritage: 'Recommended Heritage',
            sectionGoods: 'Popular Goods',
            viewAll: 'View All',
            palaceTitle: '5 Grand Palaces of Seoul',
            palaceDesc: 'Discover the 5 Grand Palaces of Seoul where the history of the Joseon Dynasty comes alive.\nExperience the beauty of Gyeongbokgung, Changdeokgung, Changgyeonggung, Deoksugung, and Gyeonghuigung.',
        },
        cart: {
            title: 'Cart',
            empty: 'Your cart is empty.',
            goShop: 'Go Shopping',
            remove: 'Remove',
            total: 'Total',
            checkout: 'Checkout',
            notReady: 'Coming soon.',
        },
        heritage: {
            title: 'Korean Heritage',
            subtitle: 'Discover beautiful spaces where a thousand years of history come alive.',
            intro: 'Introduction',
            location: 'Location',
            hours: 'Visiting Hours',
            relatedGoods: 'Related Goods',
            gyeongbokgungDetail: `Gyeongbokgung Palace, the main royal palace of the Joseon Dynasty, was founded in 1395 by King Taejo. It embodies the meaning "May the new dynasty enjoy great fortune and prosper." Destroyed by fire during the Imjin War, it was rebuilt in 1867. After suffering damage during the Japanese colonial period, it has been undergoing restoration since the 1990s.

Introduction to Gyeongbokgung
Foundation and Reconstruction: Built in 1395 as the first legal palace of Joseon, it was destroyed during the Imjin War in 1592. It was rebuilt 270 years later in 1867.
Meaning: 'Gyeongbok' carries the meaning that the new dynasty will enjoy great blessings and prosperity.
Structure: Buildings were arranged on a wide terrain with Bugaksan Mountain as the main mountain. In front of Gwanghwamun, the main gate, Yukjo Street unfolded, serving as the center of Hanyang.

Major Halls:
Gwanghwamun: The main gate of Gyeongbokgung, meaning "Gate of Shining Light."
Geunjeongjeon: A place for important national ceremonies. It is a majestic two-story building representing dignity.
Sajeongjeon: A place where the king discussed state affairs with officials.
Gangnyeongjeon: The king's living quarters.
Gyotaejeon: The queen's living quarters.
Geoncheonggung: Built by King Gojong, it is also the tragic site of the assassination of Empress Myeongseong.

Restoration: Full-scale restoration began in the 1990s. Since 1997, Gwanghwamun, Heungnyemun, and Geoncheonggung have been restored.`,
            changdeokgungDetail: `Changdeokgung Palace was built in 1405 during the reign of King Taejong as a secondary palace to Gyeongbokgung. It is considered the most Korean palace for its harmony with the natural topography. After the Imjin War, it served as the main palace of the Joseon Dynasty. Its natural architecture and landscaping were recognized when it was designated as a UNESCO World Heritage Site in 1997. Major halls include Injeongjeon, Seonjeongjeon, and Daejojeon. The spacious Secret Garden (Biwon) was an important space for royal rest, study, and contemplation.

Characteristics of Changdeokgung
Harmony with Nature: Buildings are arranged to preserve the surrounding topography, showcasing natural beauty without artificiality.
Long History: It served as the main palace for about 258 years (1610-1868) after the Imjin War.
UNESCO World Heritage: Designated as a World Heritage Site in 1997 for its architecture and landscaping that harmonize with nature.
Donggwol (East Palace): Called 'Donggwol' as it is located to the east along with Changgyeonggung.

Major Halls and Facilities
Donhwamun: The oldest main gate of a palace.
Injeongjeon: Where important national events were held; it has rank stones.
Seonjeongjeon: Where the king and officials discussed state affairs.
Daejojeon and Huijeongdang: Living quarters for the king and queen.
Secret Garden (Biwon): A garden for royal rest and study, featuring beautiful pavilions like Buyongjeong, Aeryeonjeong, and Jondeokjeong, as well as ponds and Ryucheon (an artificial waterfall made by King Injo).
Yeongyeongdang: A house built in the style of a commoner's home, where banquets were also held.

Value
Korean Beauty: The architectural style blending with nature and the beautiful scenery of the Secret Garden show the essence of Korean architecture.
Royal Life: Various halls and garden facilities allow a glimpse into the daily life, politics, and academic activities of the royal family.
Role of a Leader: Spaces like Cheonguijeong (farming experience) and Gyujanggak (for study) in the garden reveal the king's efforts to become a true leader.`,
            changgyeonggungDetail: `Changgyeonggung Palace was built in 1483 by King Seongjong to serve three queen dowagers. Connected to Changdeokgung, it was called 'Donggwol' (East Palace). Though downgraded to a zoo and botanical garden during the Japanese colonial period, it is regaining its original form through restoration.

Introduction to Changgyeonggung
Foundation and History: Built in 1483 to comfortably house the elders of the royal family. Destroyed during the Imjin War and rebuilt under King Gwanghaegun.
Meaning: "May auspicious events prosper," wishing for the prosperity of the royal family and the well-being of the elders.
Structure: The residential space (inner court) is more developed than the political space. Unlike other palaces facing south, its main gate and main hall face east.

Major Halls:
Honghwamun: The main gate where the king met subjects or distributed rice.
Myeongjeongjeon: The oldest existing main hall of a Joseon palace (rebuilt under Gwanghaegun).
Tongmyeongjeon: The queen's living quarters, the most significant building in the inner court.
Site of Jagyeongjeon: Where the building King Jeongjo built for his mother, Lady Hyegyeong, once stood.

Restoration: Downgraded to 'Changgyeongwon' (zoo/botanical garden) by Japan in 1909. Restoration began in the 1980s, relocating the zoo and restoring the name 'Changgyeonggung'.`,
            deoksugungDetail: `Deoksugung Palace was originally the residence of Prince Wolsan but became a temporary palace for King Seonjo during the Imjin War. It later became the imperial palace when King Gojong proclaimed the Korean Empire. It features a unique landscape where traditional wooden architecture and Western-style stone architecture coexist.

Introduction to Deoksugung
Foundation and Change: Originally called 'Gyeongungung', it was renamed 'Deoksugung' in 1907 when King Gojong stayed here after abdicating to Sunjong, wishing for his longevity.
Meaning: "Enjoy virtue and live long."
Structure: Located in the center of Seoul, it shows the history of the late Joseon and modern times with both traditional halls and modern Western buildings.

Major Halls:
Daehanmun: The main gate, originally named Daeanmun. Faces Seoul Plaza.
Junghwajeon: The main hall of the Korean Empire emperor, used for major national ceremonies.
Seokjojeon: A Western-style stone building where Gojong met high officials or foreign envoys. A representative work of modern architecture.
Jeonggwanheon: A fusion style building where Gojong enjoyed coffee and banquets with foreign envoys.

Historical Significance: The site of the tragedy where the Eulsa Treaty was signed, and a space of history reflecting the Korean Empire's will for modernization and its frustration.`,
            gyeonghuigungDetail: `Gyeonghuigung Palace was built in 1617 under King Gwanghaegun and served as one of the two main palaces of the late Joseon Dynasty along with Changdeokgung. Located in the west, it was called 'Seogwol' (West Palace). It was severely damaged during the Japanese colonial period but has been partially restored and opened to the public.

Introduction to Gyeonghuigung
Foundation and Damage: Built in 1617. Ten kings stayed here, but it was almost obliterated when a Japanese school (Gyeongseong Middle School) was built on the site during the colonial period.
Meaning: "Serene and Shining Palace."
Structure: A palace that stood out for its architectural aesthetics by arranging buildings using the sloping terrain.

Major Halls:
Heunghwamun: The main gate. It suffered the indignity of being moved to various places, including being used as the gate for Ito Hirobumi's shrine, before returning.
Sungjeongjeon: The main hall for morning assemblies and royal banquets.
Jajeongjeon: The council hall where the king held meetings or worked.
Taeryeongjeon: Where King Yeongjo's portrait was kept.

Restoration: Only a small part of the original scale has been restored. Opened to the public in 2002 after excavations began in the 1980s, efforts to restore its historical value continue.`,
        },
        palaces: {
            gyeongbokgung_name: 'Gyeongbokgung',
            gyeongbokgung_desc: 'The primary legal palace of the Joseon Dynasty. A majestic palace harmonizing with Gwanghwamun under Bugaksan Mountain.',
            changdeokgung_name: 'Changdeokgung',
            changdeokgung_desc: 'The most Korean palace harmonizing with nature. A UNESCO World Heritage Site.',
            changgyeonggung_name: 'Changgyeonggung',
            changgyeonggung_desc: 'A palace loved as a living space for the royal family. Famous for its Grand Greenhouse and night openings.',
            deoksugung_name: 'Deoksugung',
            deoksugung_desc: 'A site of modern history where traditional wooden architecture and Western stone architecture coexist.',
            gyeonghuigung_name: 'Gyeonghuigung',
            gyeonghuigung_desc: 'The West Palace used as a shelter for late Joseon kings. Enjoy a quiet walk in the city center.',
        },
        shop: {
            title: 'Museum Shop',
            subtitle: 'Discover special goods that capture the beauty of Korea.',
            addToCart: 'Add to Cart',
            added: 'Added to cart. Would you like to view your cart?',
        },
        login: {
            title: 'Login',
            id: 'ID',
            password: 'Password',
            submit: 'Login',
            error: 'Invalid ID or Password.',
            signupLink: 'Not a member yet? Sign Up',
        },
        signup: {
            title: 'Sign Up',
            name: 'Name',
            password: 'Password',
            confirm: 'Confirm Password',
            phone: 'Phone',
            interests: 'Interest Palace',
            country: 'Country of Residence',
            status: 'Status',
            local: 'Local',
            foreigner: 'Foreigner',
            placeholderCountry: 'Republic of Korea',
            submit: 'Sign Up',
            required: 'Please fill in all required fields.',
            mismatch: 'Passwords do not match.',
            exists: 'ID already exists.',
            success: 'Registration complete. Please login.',
            loginLink: 'Already a member? Login',
            gender: 'Gender',
            male: 'Male',
            female: 'Female',
        },
        footer: {
            desc: 'Discover the beautiful cultural heritage\nand special goods of Korea.',
            menu: 'Menu',
            cs: 'Customer Center',
            notice: 'Notice',
            faq: 'FAQ',
            inquiry: 'Inquiry',
        },
        contact: {
            title: 'Contact Us',
            desc: 'Have any questions? We are here to help.',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            button: 'Send Message',
            success: 'Inquiry sent successfully.',
        },
        faq: {
            title: 'Frequently Asked Questions',
            subtitle: 'Here are some common questions from our visitors.',
            q1: 'What are the opening hours?',
            a1: 'Opening hours vary by palace and season. Please check the specific heritage detail page for more information.',
            q2: 'Is a reservation required?',
            a2: 'General admission does not require a reservation, but special tours or guide programs may require advance booking.',
            q3: 'Is there parking available?',
            a3: 'Most palaces have public parking lots, but they can be crowded on weekends and holidays. Public transport is recommended.',
        },
        common: {
            notFound: 'Page not found.',
            loading: 'Loading...',
            error: 'Error',
            home: 'Go Home',
        },
        converter: {
            title: 'Temperature Converter',
            desc: 'Easily convert between Celsius (℃) and Fahrenheit (℉).',
            celsius: 'Celsius (℃)',
            fahrenheit: 'Fahrenheit (℉)',
            boiling: 'Water would boil!',
            notBoiling: 'Water would not boil.',
            explanationTitle: 'Temperature Unit in Korea',
            explanation: 'Korea uses **Celsius (℃)** for measuring temperature.\nThis is different from **Fahrenheit (℉)** used in some countries like the US. Please keep this in mind during your trip.',
        },
        clock: {
            title: 'World Clock',
            seoul: 'Seoul (Korea)',
            newyork: 'New York (USA)',
            paris: 'Paris (Europe)',
        }
    }
};

// 언어 관련 데이터를 전역적으로 관리 공급하는 Provider 컴포넌트
export function LanguageProvider({ children }) {
    // 현재 선택된 언어 상태 관리 ('ko': 한국어, 'en': 영어) - 기본값은 한국어
    const [language, setLanguage] = useState('ko');

    // 언어를 토글(전환)하는 함수
    // 한국어('ko')일 경우 영어('en')로, 그 외의 경우(영어)에는 다시 한국어로 변경
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
    };

    // 다국어 번역 헬퍼 함수
    // section: 번역 데이터의 대분류 (예: 'nav', 'home' 등)
    // key: 대분류 내의 구체적인 항목 키
    // 동작: 현재 설정된 언어(language)에 맞는 번역 객체에서 텍스트를 찾아 반환
    // 만약 번역 데이터가 없으면 fallback으로 key 값을 그대로 반환하여 에러 방지
    const t = (section, key) => {
        return translations[language][section][key] || key;
    };

    // Context.Provider를 통해 하위 컴포넌트들에게 언어 상태와 함수들을 전달
    // language: 현재 언어 값
    // toggleLanguage: 언어 변경 함수
    // t: 번역 함수
    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

// 하위 컴포넌트에서 언어 관련 데이터에 쉽게 접근하기 위한 커스텀 Hook
// useContext(LanguageContext)를 직접 사용하는 대신 이 Hook을 호출하여 사용
// 반환값: { language, toggleLanguage, t } 객체
export function useLanguage() {
    return useContext(LanguageContext);
}
