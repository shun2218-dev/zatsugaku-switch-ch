---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-11-04"
sourceHash: 8c53581899a2
title: Why does laundry dry faster on windy days?
answer: "How fast laundry dries can be mostly explained by three factors: how dry the air is (the vapor pressure deficit), the amount of sunlight, and wind speed. In an experiment by Japan Weather Association-style forecaster Nihon Kishou Co., Ltd., a multiple regression using these three variables reached a coefficient of determination of about 0.8 for drying ease. Wind's job is to swap the humid air next to the fabric for dry air. When drying indoors, the two things you can control are humidity and air movement."
description: Even at the same temperature and in the same sunshine, whether there's wind or not makes a big difference in how fast laundry dries. Look at the moisture evaporating from the fabric and how the air around it moves, and the reason behind this everyday phenomenon becomes clear. A bit of everyday science trivia to enjoy in a spare moment before or after your commute.
scenes:
  - text: Laundry dries because water evaporates from the fabric and escapes into the air.
    alt: Illustration of laundry hanging on a balcony, morning light, a calm and still atmosphere
  - text: But the air right next to the fabric keeps picking up moisture and gets more and more humid.
    alt: Fine particles of water vapor rising from the surface of the fabric, drawn like a haze
  - text: Without wind, that humid air just stays put, making it harder for any more moisture to escape.
    alt: No wind; a thin haze lingering motionless around the laundry
  - text: When the wind blows, that humid air gets swept away, and fresh dry air keeps touching the fabric.
    alt: Illustration of laundry swaying in the wind as the surrounding haze flows away
  - text: That's why, even at the same temperature, laundry dries much faster on a windy day.
    alt: Dry laundry fluttering pleasantly under a clear, bright sky
sources:
  - title: 洗濯予報で用いる乾燥ポテンシャルの開発実験
    titleEn: Development Experiment for the Drying Potential Used in Laundry Forecasts
    publisher: Nihon Kishou Co., Ltd. (Otenki Data Science)
    url: https://ods.n-kishou.co.jp/tech/blog/detail/2409
    lang: ja
  - title: 洗濯物の室内干し（繊維製品消費科学 47巻11号 681-685頁, 2006）
    titleEn: Drying Laundry Indoors (Journal of the Japan Research Association for Textile End-Uses, Vol. 47, No. 11, pp. 681-685, 2006)
    publisher: Hyogo Prefectural Institute of Life Science / Japan Research Association for Textile End-Uses
    url: https://www.jstage.jst.go.jp/article/senshoshi1960/47/11/47_11_681/_article/-char/ja/
    lang: ja
---
### Drying can mostly be explained by three numbers

Nihon Kishou Co., Ltd., a Japanese company that produces "laundry forecasts" (daily forecasts of how well laundry will dry outdoors), ran an experiment in which it actually hung laundry outside and took measurements.

The company repeatedly hung the same clothes in the same outdoor spot, weighed them after one hour to calculate how much water had evaporated, and repeated this seven times between 9 a.m. and 4 p.m. Even with different types of clothing, the patterns of rising and falling evaporation were similar, and when divided by surface area, it could be assumed that "when thoroughly wet, the amount of evaporation is proportional to surface area." The company named this evaporation per unit area the **drying potential**.

Then, using data from a nearby weather station, it ran a linear multiple regression narrowed down to three explanatory variables, and the **coefficient of determination was about 0.8**. In other words, how easily laundry dries is mostly determined by these three things:

- **Vapor pressure deficit** (how many more grams of water vapor the air can take in; the higher the temperature and the lower the humidity, the larger it is)
- **Solar radiation** (the clothes warm up, which speeds evaporation)
- **Wind speed** (carries away the evaporated water vapor)

What the company's experiment shows is that wind is "one of the three pillars."

### Wind's job is to carry things away

Line up the roles of the three factors, and you'll notice that wind is different in kind. Temperature, humidity, and sunlight are conditions that determine "how easily water turns into vapor," while wind is the condition that determines "where that vapor goes once it forms."

As explained in the video, the air right next to the fabric keeps absorbing moisture and gets more and more humid. Even on a day with a large vapor pressure deficit (that is, when the air is dry), the thin layer touching the fabric still ends up humid. Wind's role is to peel that layer away and replace it with dry air.

That's why "laundry dries faster on windy days" holds true even when temperature and humidity are the same.

### Fast at first, slow at the end

The same experiment also reports a finding that's quietly useful for anyone hanging laundry.

At first, the company took measurements without re-wetting the clothes except at the start of the day. But this revealed that "as moisture decreases, the amount of evaporation per hour gets smaller," so they switched to re-wetting the clothes every time.

In other words, the drying rate isn't constant. A big chunk of water leaves in the first hour while the clothes are soaking wet, and progress slows as less moisture remains. That feeling of "it's almost dry, but it just won't finish" turns out to be correct.

### Indoors, you can only control two of them

Thinking in terms of the three factors neatly organizes how to deal with drying laundry indoors.

- **Solar radiation**: Basically not available indoors. You'll just have to give up on this one
- **Vapor pressure deficit**: Can be increased by lowering humidity with a dehumidifier or your air conditioner's dry mode
- **Wind speed**: Can be created with an electric fan or air circulator

The standard approach to indoor drying, then, is to use both of the remaining two. When blowing air, it's effective not only to aim it directly at the laundry but also to keep the air in the whole room circulating. Even if you peel away the humid air next to the fabric, if the room's air itself stays humid, the moisture has nowhere to go.

For research comparing indoor drying conditions, see "Drying Laundry Indoors" by the Hyogo Prefectural Institute of Life Science (Journal of the Japan Research Association for Textile End-Uses, Vol. 47, No. 11, 2006).

### Related reading

- [Why does the breeze from an electric fan feel cool?](/trivia/y8p4n1ioVgc/)
- [Why does laundry dried indoors get that musty smell?](/trivia/qeIKbiU6_AQ/)
- [Why can silica gel desiccant be used over and over?](/trivia/WI2xa5RaFpc/)
