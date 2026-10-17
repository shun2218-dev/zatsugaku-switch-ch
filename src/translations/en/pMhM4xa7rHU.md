---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-10-17"
sourceHash: 8188bd457006
title: Why do phone batteries wear out year after year?
answer: Every time you charge and discharge, a thin film on the electrode surface (the SEI layer) gets a little thicker, and as it grows it traps lithium, the element that carries the charge, so that lithium can no longer be used. Add tiny cracks forming in the electrode particles, and the amount of charge the battery can hold gradually shrinks. This happens faster in heat or when the battery sits near 100% for long stretches, which is why manufacturers advise avoiding hot places and offer features that cut down the time your phone spends fully charged.
description: "Your smartphone battery gets used every day. Why does it drain faster the longer you've had it? Here's a simple explanation of how it works. Once you understand how lithium-ion batteries degrade, you might change how you use your phone a little. #shorts #trivia"
scenes:
  - text: Inside smartphones and rechargeable batteries is a system where tiny particles called lithium ions move back and forth.
    alt: A cutaway illustration of a smartphone, with a diagram showing particles moving back and forth inside
  - text: Each time you charge and discharge, the path those particles travel gets a little more deformed.
    alt: An illustration of a layered structure gradually becoming warped
  - text: Then the particles can't pass through as smoothly, so even when it says "full," the battery holds less and less.
    alt: A full battery icon gradually shrinking
  - text: On top of that, high temperatures and repeatedly charging all the way to 100% are said to speed up this wear.
    alt: A smartphone sitting in a hot spot next to a thermometer (no numbers)
  - text: That's why, even with the same phone, battery life depends on how you use it.
    alt: Silhouettes of a new smartphone and a well-used smartphone side by side
sources:
  - title: iPhoneのバッテリーとパフォーマンス
    titleEn: iPhone Battery and Performance
    publisher: Apple Support
    url: https://support.apple.com/ja-jp/101575
    lang: ja
  - title: バッテリー - パフォーマンスを最大化する
    titleEn: Batteries - Maximizing Performance
    publisher: Apple
    url: https://www.apple.com/jp/batteries/maximizing-performance/
    lang: ja
  - title: iPhoneの充電上限とバッテリー充電の最適化について
    titleEn: About iPhone charge limit and Optimized Battery Charging
    publisher: Apple Support
    url: https://support.apple.com/ja-jp/108055
    lang: ja
  - title: Google Pixel のバッテリーについて
    titleEn: About your Google Pixel battery
    publisher: Google Pixel Help
    url: https://support.google.com/pixelphone/answer/15738128?hl=ja
    lang: ja
  - title: The importance of degradation mode analysis in parameterising lifetime prediction models of lithium-ion battery degradation
    publisher: Li R. et al., Nature Communications, 2025
    url: https://pmc.ncbi.nlm.nih.gov/articles/PMC11926349/
    lang: en
  - title: "Calendar Aging of Lithium-Ion Batteries: I. Impact of the Graphite Anode on Capacity Fade"
    publisher: Keil P. et al., Journal of The Electrochemical Society, 2016
    url: https://iopscience.iop.org/article/10.1149/2.0411609jes
    lang: en
  - title: 大気非曝露表面分析について 〜リチウムイオン二次電池負極の測定事例〜（Technical Sheet No.24-01）
    titleEn: "Air-Free Surface Analysis: A Measurement Example of a Lithium-Ion Secondary Battery Negative Electrode (Technical Sheet No.24-01)"
    publisher: Osaka Research Institute of Industrial Science and Technology
    url: https://orist.jp/technicalsheet/24-01.pdf
    lang: ja
  - title: リチウムイオン電池使用製品による発火事故に注意しましょう
    titleEn: Beware of Fires Caused by Products Using Lithium-Ion Batteries
    publisher: Consumer Affairs Agency, Fire and Disaster Management Agency, Ministry of Economy, Trade and Industry, and Ministry of the Environment (Japan) (October 2, 2025)
    url: https://www.caa.go.jp/policies/policy/consumer_safety/caution/caution_083/assets/caution_083_251002_0001.pdf
    lang: ja
---
### What's actually wearing out inside the battery?

A smartphone battery (a lithium-ion battery) stores and releases energy by moving lithium ions from the positive electrode to the negative electrode when charging, and back to the positive electrode when in use. The video described it as "the path the particles travel gets a little more deformed," but research points to a somewhat different main cause.

The surface of the negative electrode is covered by a very thin film formed when the electrolyte (the liquid inside the battery) breaks down. It's called the SEI layer (solid electrolyte interphase), and it's essential: it keeps the electrolyte from breaking down any further. The catch is that as the battery goes through charge and discharge cycles, this film slowly gets thicker.

A 2025 study (Nature Communications) lists one of the degradation mechanisms as **usable lithium being consumed as this film grows**. The lithium that carries the charge gets locked into the film and can no longer move back and forth, so even when you charge to full, the battery holds less. The same study also lists other causes of degradation: when electrode particles crack and expose fresh surfaces, new film grows there and consumes more lithium, and the electrode material itself can become unusable.

### Where the "pathway" analogy fits

The Osaka Research Institute of Industrial Science and Technology took apart commercial batteries that had been charged and discharged about 1,000 times, until their capacity had dropped to less than half of new, and found that the surface of the negative electrode looked very different from a new one. The institute explains that when the film gets too thick, it gets in the way of lithium ions moving around, and the battery's power (output) drops.

In other words, the "harder to get through" analogy does work as an explanation for lower output (for example, a phone being more likely to shut off during heavy tasks). But the main reason the battery holds less charge is better thought of as "less lithium available to move back and forth" rather than "harder to get through."

### Heat, and leaving it fully charged

As the video says, heat and full charges speed up degradation. But the key point is less about "how many times you charge to 100%" and more about **leaving the battery sitting near 100% for a long time**.

In a German study (2016), three types of cylindrical batteries were stored at 16 different charge levels from 0% to 100%, at 25°C, 40°C, and 50°C (77°F, 104°F, and 122°F), for 9 to 10 months. At 50°C they lost far more capacity than at 25°C, and at high charge levels the film on the negative electrode grew more easily, so usable lithium was lost faster. Interestingly, degradation didn't rise smoothly in proportion to charge level. Instead it followed a "stair-step" pattern, where charge levels 20–30% apart could show about the same amount of wear. Batteries slowly degrade even when just sitting unused, which is another reason they wear out year after year.

Manufacturers' guidance points in the same direction as this research.

- **Apple**: Says the comfortable operating range is 16–22°C (62–72°F), and that leaving a device somewhere above 35°C (95°F) can permanently damage battery capacity. It also explains that "Optimized Battery Charging" is a feature that reduces the time spent fully charged to help prevent wear.
- **Google (Pixel)**: Recommends charging in a cool place around 25°C (77°F) and not leaving the phone somewhere above 35°C (95°F) for long periods (6 hours or more).

As a rough guide to how long batteries last, Apple states that models up through iPhone 14 are designed to retain 80% of their original capacity after 500 full charge cycles, and iPhone 15 and later after 1,000. For Pixel, Google says 80% after about 800 or about 1,000 cycles, depending on the model.

### If it swells, stop using it

Japan's Consumer Affairs Agency and other agencies warn that if a battery is hot, **swollen**, leaking, or giving off an unusual smell or sound, continuing to use it can lead to smoke, fire, or bursting. You should also watch for changes like slower charging, running hotter than before, or suddenly shutting off. If you notice anything out of the ordinary, stop using and charging the device right away and contact the manufacturer's repair service or a similar support channel. Trying to push a deformed device back into shape by hand is also dangerous. Keeping your phone out of cars parked in the blazing sun and away from heaters matters both for slowing battery wear and for preventing accidents.

### Related reads

- [Why do batteries run down even when you don't use them?](/trivia/jPkk2Mwb3bs/)
- [Why doesn't stainless steel rust easily?](/trivia/ERyA1Hl4RO8/)
