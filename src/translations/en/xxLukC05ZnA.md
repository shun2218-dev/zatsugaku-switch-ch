---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-10-17"
sourceHash: 0f23fb8e3b80
title: Why won't an elevator fall even if its cables snap?
answer: Under Japanese law, parts of an elevator that can wear out, like its ropes, must be "made up of two or more parts, each able to hold the car on its own." On top of that, if the car starts going too fast, a governor (a device that monitors speed) cuts the power, and if the car still keeps descending, a safety gear clamps onto the rails to stop it. There are also buffers at the bottom of the shaft to soften any impact. Multiple layers of protection work together to keep the car from falling.
description: You ride elevators and escalators every day without a second thought. In 20 seconds, we explain the clever design hidden in these everyday machines, from the safety devices that keep an elevator from falling even if its ropes break to why the handrail and the steps move at slightly different speeds. Perfect for your commute.
scenes:
  - text: The elevator you ride every day without thinking about it. Did you know it isn't hung from just one rope, but from several bundled together?
    alt: Close-up of multiple elevator cables bundled together
  - text: Because several thick ropes hold the car, even if one breaks, the rest keep supporting it.
    alt: Diagram showing the other ropes holding the car even after one of several ropes breaks
  - text: And even in the unlikely event that every rope breaks, a safety gear grips the rails firmly and brings the car to a stop.
    alt: Illustration of a safety device gripping the elevator rails
  - text: Escalators, meanwhile, are required by law to have the handrail and the steps move in the same direction at the same speed.
    alt: Diagram of gears inside an escalator driving the steps and the handrail
  - text: So why does the handrail sometimes pull ahead? It's hard to match the speeds perfectly, and they gradually drift apart with use. Even your daily commute depends on careful little adjustments.
    alt: Illustration comparing the movement of an escalator's handrail and steps
sources:
  - title: 建築基準法施行令（第129条の4、第129条の10、第129条の12）
    titleEn: Order for Enforcement of the Building Standards Act (Articles 129-4, 129-10, and 129-12)
    publisher: e-Gov Law Search (Digital Agency, Japan)
    url: https://laws.e-gov.go.jp/law/325CO0000000338
    lang: ja
  - title: エレベーターの制動装置の構造方法を定める件（平成12年建設省告示第1423号）
    titleEn: Structural Methods for Elevator Braking Devices (Ministry of Construction Notice No. 1423 of 2000)
    publisher: Ministry of Land, Infrastructure, Transport and Tourism (Japan)
    url: https://www.mlit.go.jp/common/001280382.pdf
    lang: ja
  - title: エレベーター強度検証法の対象となるエレベーター、エレベーター強度検証法及び屋外に設けるエレベーターに関する構造計算の基準を定める件（平成12年建設省告示第1414号）
    titleEn: Elevators Subject to the Elevator Strength Verification Method, the Elevator Strength Verification Method, and Structural Calculation Standards for Outdoor Elevators (Ministry of Construction Notice No. 1414 of 2000)
    publisher: Ministry of Land, Infrastructure, Transport and Tourism (Japan)
    url: https://www.mlit.go.jp/common/001280376.pdf
    lang: ja
  - title: エレベーターの安全対策
    titleEn: Elevator Safety Measures
    publisher: Japan Elevator Association
    url: https://www.n-elekyo.or.jp/safety/elevator.html
    lang: ja
  - title: 戸開走行保護装置の設置の促進及び設置済みマークの活用について（国住指第3008号-2）
    titleEn: On Promoting the Installation of Unintended Car Movement Protection Devices and the Use of Installation Marks (Kokujushi No. 3008-2)
    publisher: Building Guidance Division, Housing Bureau, Ministry of Land, Infrastructure, Transport and Tourism (Japan)
    url: https://www.mlit.go.jp/common/000229162.pdf
    lang: ja
  - title: エスカレーターの種類と安全対策（令和7年度 第1回 資料2）
    titleEn: Types of Escalators and Safety Measures (FY2025 1st Meeting, Document 2)
    publisher: Tokyo Metropolitan Government Product Safety Council
    url: https://www.shouhiseikatu.metro.tokyo.lg.jp/anzen/kyougikai/r7/documents/r7kyogikai-1_handout-01-2.pdf
    lang: ja
  - title: 令和6年4月1日からエスカレーターの安全基準が変わります。
    titleEn: Escalator Safety Standards Are Changing from April 1, 2024
    publisher: Japan Elevator Association
    url: https://www.n-elekyo.or.jp/about/pdf/20240327_Escakokuji.pdf
    lang: ja
---
### The rule: it has to be fine even if one rope breaks

As the video says, a typical traction (rope-type) elevator hangs its car from several ropes, not just one. This isn't merely a clever design choice; it's a legal requirement.

Japan's Order for Enforcement of the Building Standards Act (Article 129-4) states that any part supporting the car that could wear down or suffer metal fatigue must be **made up of two or more parts, each able to support the car on its own**. The main ropes fall squarely into this category, so if one breaks, the others can still hold the car.

There are standards for rope strength, too. A notice from the Ministry of Land, Infrastructure, Transport and Tourism (No. 1414) specifies that for ordinary elevators using wire ropes 10 mm or more in diameter (8 mm or more for small ones), the ropes must be 5 times as strong as the force they normally bear when installed, and still 4 times as strong after continued use (this is called the safety factor). How many ropes are used depends on the elevator's size and design.

### If they all break, the elevator detects it by speed

The video said that "even if every rope breaks, a safety gear grips the rails firmly and brings the car to a stop." It's true that this device is one of the last lines of defense, but the system actually works in two stages.

1. **The governor monitors speed**: If the car's speed rises abnormally, the governor automatically cuts the power before the car exceeds 1.3 times its normal speed (rated speed).
2. **The safety gear clamps the rails**: If the car still keeps descending, the safety gear clamps onto the rails and stops the car before it exceeds 1.4 times its rated speed.

For elevators traveling at 45 m per minute or less, fixed values of 63 m and 68 m per minute are used instead of 1.3 and 1.4 times.

In other words, rather than sensing that the ropes have broken, the system uses "the car is going too fast" as its cue to stop. (For some elevators with small loads or short travel heights, a device that stops the car when the ropes break is also permitted.)

Also, the "grip firmly" style of stopping is limited to slow-moving elevators. According to the Japan Elevator Association, stopping a fast elevator (over 45 m per minute) instantly would put a heavy shock on the car and actually be dangerous. So these use a "progressive safety gear," which gradually increases braking force to slow the car down before stopping it.

In addition, in case the car overshoots the top or bottom floor for some reason, buffers that absorb impact using springs or oil are installed at the bottom of the shaft. And elevators whose construction began on or after September 28, 2009, are also required to have an "unintended car movement protection device," which prevents accidents where the car starts moving with its doors open.

### If you get stuck

By law, elevators must have a device that lets people inside the car contact the outside during a power outage or similar situation. The Japan Elevator Association advises that if you're trapped, you should use the intercom to explain the situation and wait to be rescued. Forcing the doors open or trying to climb out is extremely dangerous. The car isn't airtight, so air flows in and there's no risk of suffocation. Emergency lighting also comes on during a power outage. If you feel shaking from an earthquake, the basic rule is to press all the floor buttons and get off at the first floor where the car stops.

### The speed of escalator handrails

As the video says, the Order for Enforcement of the Building Standards Act (Article 129-12) requires an escalator's handrail to "move in conjunction with the steps in the same direction and at the same speed."

However, the handrail is a separate part from the steps, and it's usually driven indirectly through a chain from the drive wheels or other parts that move the steps. Materials from the Tokyo Metropolitan Government also describe the handrail as moving at "almost the same speed" as the steps. The video explained that the handrail pulls ahead because "they gradually drift apart with use," but we couldn't find any official source showing why, or by how much, they drift. You may notice a slight difference, but it's best to think of them as designed to move at the same speed.

Because a handrail that stops on its own could cause riders to fall, escalators whose construction began on or after April 1, 2024, are required to have a device that automatically stops operation if the handrail stops or becomes extremely slow.

### Related reads

- [The order of traffic light colors is actually set by law](/trivia/55ldyUTDMTU/)
- [Why are manhole covers round?](/trivia/vTmjZkwqerg/)
