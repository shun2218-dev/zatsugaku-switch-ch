---
answer: オフサイドの判定を助けているのは「半自動オフサイドテクノロジー（SAOT）」で、2022年ワールドカップでは専用カメラ12台が選手の体の29か所を1秒に50回、ボールの中のセンサーが1秒に500回の記録をとっていました。ただし「1cm単位で見抜ける」という精度をFIFAが公表しているわけではなく、最後に判定するのは人の審判です。
reviewedAt: "2026-10-17"
sources:
  - title: Semi-automated offside technology（FIFA World Cup Qatar 2022）
    publisher: FIFA
    url: https://inside.fifa.com/technical/football-technology/football-technologies-and-innovations-at-the-fifa-world-cup-2022/semi-automated-offside-technology
  - title: FIFA Quality Programme for Offside Technology - Test Manual（February 2026）
    publisher: FIFA
    url: https://digitalhub.fifa.com/m/02a5079971342b5d/original/FIFA-Quality-Programme-for-Offside-Technology-Test-Manual-February-2026.pdf
  - title: Landmark innovations at FIFA Club World Cup to enhance fan experience, transparency and operations
    publisher: FIFA（2025年6月6日）
    url: https://inside.fifa.com/innovation/news/landmark-innovations-club-world-cup-enhance-fan-experience-transparency-operation
  - title: "FIFA celebrates launch of Official Match Ball of FIFA World Cup 26: TRIONDA"
    publisher: FIFA（2025年10月2日）
    url: https://inside.fifa.com/media-releases/fifa-celebrates-launch-official-match-ball-world-cup-26-trionda
  - title: Video Assistant Referee (VAR) protocol
    publisher: The International Football Association Board (IFAB)
    url: https://www.theifab.com/laws/latest/video-assistant-referee-var-protocol/
  - title: VAR discussed at IFAB media briefing
    publisher: FIFA（2018年3月3日）
    url: https://inside.fifa.com/en/refereeing/news/var-discussed-at-ifab-media-briefing
  - title: Is perception of VAR outcome biomechanically accurate?
    publisher: Soltani P., ISBS Proceedings Archive, 2022
    url: https://commons.nmu.edu/isbs/vol40/iss1/158
---

### VAR はカメラではなく「審判」

まず言葉を整理しておきます。競技規則の VAR の手順書（IFAB の VAR プロトコル）では、VAR（ビデオ・アシスタント・レフェリー）は**試合の映像を自由に見られる審判員**のことだと定められています。手助けできるのは、得点やPK、一発退場などで「はっきりした明らかな間違い」があったときなどに限られ、最後の判定はいつも主審が下します。

動画では「VAR の正体は専用カメラ」と紹介しましたが、正確には、VAR という審判を助ける道具の一つとして、カメラとコンピューターを使う「半自動オフサイドテクノロジー（SAOT）」がある、という関係です。

### 2022年ワールドカップのしくみ

FIFA の説明によると、2022年のカタール大会で使われた SAOT は次のようなしくみでした。

- スタジアムの屋根の下に、追跡専用のカメラ12台を設置。
- ボールと、選手1人につき最大29か所の点（手足の先など、オフサイドの判定に関係する部分）を、1秒に50回記録して、ピッチ上の位置を計算する。
- ボールの中には動きを測るセンサー（IMU＝慣性計測装置）が入っていて、1秒に500回データを送る。これで「ボールが蹴られた瞬間」を細かく特定する。

選手がオフサイドの位置でボールを受けると、AI を使って自動で「オフサイドの可能性あり」という知らせがビデオ室に届きます。ビデオ担当の審判は、自動で選ばれた「蹴った瞬間」と、自動で引かれたオフサイドラインを自分の目で確かめてから主審に伝えます。同じ位置データから3Dアニメーションも作られ、場内のスクリーンなどで見せられました。

動画の「最大20台以上の専用カメラ」「毎秒何百回も記録」は、少し言い過ぎです。カタール大会の公式の数字では、専用カメラは12台、選手の体の記録は1秒に50回で、1秒に500回なのはボールのセンサーのほうです。大会や会場によって設備は変わり、2025年のクラブワールドカップでは改良版が使われましたが、FIFA の発表ではカメラの台数は「複数」とだけ書かれています。2026年ワールドカップの公式球「トリオンダ」にも、500Hz（1秒に500回）のセンサーが入っています。

### 「1cm単位」と言えるのか

タイトルの「1cm単位で見抜ける」は、FIFA の公開資料では確かめられませんでした。FIFA が SAOT の精度を「何cm」と数字で公表しているわけではありません。

参考になるのが、オフサイド判定の機械を認証するための FIFA の試験マニュアル（2026年2月版）です。ピッチに正しい位置を測った目印を置き、機械が引いたラインがその範囲に入るかを調べます。合格の範囲は、地面での試験で正しい位置から**±25cm**、体の一部が浮いている場面の試験では、選手のいる場所で±20cmとされています。これは「この範囲から外れたら不合格」という最低ラインで、実際の機械がこれだけずれるという意味ではありませんが、「1cm単位」を約束する仕組みでないことはわかります。

### 記録と記録のあいだのすきま

もう一つの限界は、記録の回数です。1秒に50回ということは、記録と記録のあいだは0.02秒あります。たとえば秒速8mで走る選手なら、0.02秒で16cmも進む計算です。ボールのセンサーは1秒に500回なので「蹴った瞬間」はより細かくわかりますが、その瞬間の選手の位置をどう補っているかまでは、FIFA の公開資料には書かれていません。

人の目で映像を見る場合は、さらにむずかしくなります。イギリスのバース大学の研究では、10人の参加者に映像を見せて判断してもらうと、「蹴った瞬間」を平均で0.132秒遅く選んでいました。ボールのセンサーで蹴った瞬間を自動で見つけるのは、この弱点をおぎなうための工夫です。

### 誤審は「ほぼゼロ」になったのか

動画の冒頭では「誤審は年々ほぼゼロに近づいている」と紹介しました。VAR を正式に導入する前の試験では、ベルギーのルーヴェン大学が約1000試合を調べ、試合の流れを変える判定の正解率が、VAR なしの93%から、VAR ありで98.8%に上がったと報告されています。大きく改善したのは確かですが、「ゼロ」ではありません。オフサイドは位置を測れる判定ですが、それでも記録の回数や機械の誤差という限界がある、と知っておくと見方が深まります。

### あわせて読みたい

- [サッカーのオフサイド、なぜ一瞬の判定が正確なの？](/trivia/TXtg5ERTk3I/)
- [サッカーの誤審、なぜVAR導入後も完全になくならないの？](/trivia/SO6mE2Xz4d4/)
- [なぜ、オフサイドは「後ろから2番目」で決まるの？](/trivia/DAmkVLn-OAA/)
