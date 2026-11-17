---
# Claude で日本語から翻訳した英語版（AI 翻訳としてそのまま公開される）。人が確かめたら reviewedAt に日付（"2026-10-17" の形）を入れると「確認済み」と出る
reviewedAt: ""
translatedAt: "2026-11-17"
sourceHash: 79377ff65c59
title: Why do you get fewer static shocks on humid days?
answer: When humidity is high, water molecules from the air stick to the surfaces of objects and form a thin film of water, and built-up charge gradually leaks away through that film. In experiments by the Osaka Research Institute of Industrial Science and Technology, charge on washi (traditional Japanese paper) disappeared faster the higher the humidity. However, static electricity is still being generated even when it's humid, and draining it fast enough to prevent a zap takes quite high humidity. It's probably best to think of humidifying as just a supplementary measure.
description: That little zap of static electricity is a winter classic. But did you know you tend to get fewer shocks on humid days? This calm, easygoing video explains how charge escapes more easily from the surfaces of objects that readily take up moisture. A 20-second bit of trivia, perfect for your commute.
scenes:
  - text: On humid days, you tend to get fewer of those static zaps.
    alt: A rainy-day window scene with the silhouette of a hand reaching for a doorknob. A quiet scene with no sparks.
  - text: Static shocks happen more on dry winter days because there's little moisture in the air, so built-up charge has a hard time escaping.
    alt: A dry winter room with silhouettes of a sweater icon and a small lightning bolt symbol
  - text: When the air is humid, a layer of water forms on the surfaces of objects that readily take up moisture, and charge can escape more easily through it.
    alt: An abstract particle image of water droplets floating in the air and electricity dispersing
  - text: That's why the zap you feel from things like doorknobs tends to be weaker on humid days.
    alt: Close-up of a hand touching a doorknob, calm with no sparks
  - text: On the flip side, during dry seasons, humidifying is said to help as a supplementary way to fight static.
    alt: Silhouette of steam rising from a humidifier in a calm, peaceful room
sources:
  - title: バチッと感じる静電気。湿度との関係は？（Technical Sheet No.10001）
    titleEn: "That Zapping Static Electricity: How Is It Related to Humidity? (Technical Sheet No.10001)"
    publisher: Osaka Research Institute of Industrial Science and Technology (ORIST), Manabu Hirai, 2010
    url: https://orist.jp/technicalsheet/10001.pdf
    lang: ja
  - title: "Fundamentals of Electrostatic Discharge, Part One: An Introduction to ESD"
    publisher: EOS/ESD Association (U.S. industry association for electrostatic discharge), 2020
    url: https://www.esda.org/esd-fundamentals/part-1-an-introduction-to-esd/
    lang: en
  - title: Humidity-Induced Charge Leakage and Field Attenuation in Electric Field Microsensors
    publisher: Zhang H. et al., Sensors, 2012
    url: https://pmc.ncbi.nlm.nih.gov/articles/PMC3355460/
    lang: en
---
### Static electricity happens all year round

Manabu Hirai of the Osaka Research Institute of Industrial Science and Technology (ORIST) writes that static electricity is all around us regardless of the season; we just don't notice it. The zap you feel in winter happens when positive or negative charge builds up unevenly on an object or on your body and then tries to return to balance all at once.

According to an explainer from the EOS/ESD Association, an industry group focused on electrostatic discharge, when two objects touch and then separate, electrons move from one to the other, leaving the charge unbalanced. This is called **triboelectric charging** (contact charging). How much charge builds up depends on things like the contact area, how fast the objects separate, the humidity, and the types of materials.

The same explainer states clearly that **static electricity is still generated even when humidity is high**. What humidity changes dramatically is how much of that charge stays built up.

### How much humidity makes a difference

The EOS/ESD Association summarizes the effect of humidity in a table:

- Walking across a carpet: about 35,000 volts at 10–25% humidity, about 1,500 volts at 65–90% humidity
- Walking across a vinyl tile floor: about 12,000 volts at 10–25% humidity, about 250 volts at 65–90% humidity

In other words, even if you walk the same way, the voltage built up on your body can be dozens of times higher on a dry day.

### A thin film of water on the surface

So when it's humid, where does the charge escape to?

A paper by Zhang et al. published in the journal Sensors explains that water molecules in the air stick to the surfaces of objects and form a **thin film of water**, whose thickness changes with the humidity of the surrounding air. This water film becomes a pathway through which charge leaks away.

The paper notes that even fluoropolymer (PTFE), which normally repels water, picks up water more easily when its surface is scratched or dirty. As the video put it, "a layer of water forms on the surfaces of objects that readily take up moisture"—how the water film forms depends on the material and the condition of its surface.

### Testing how charge fades, using washi

ORIST charged washi (traditional Japanese paper) and measured how quickly that charge faded away at different humidity levels.

The result: the higher the humidity, the much shorter the time it took for the charge to disappear. The washi's resistance to carrying electricity (its electrical resistance) also dropped sharply as humidity rose. ORIST explains that at low humidity, electrical resistance is high, so charge has a hard time moving.

By their calculations, if the washi's electrical resistance is 10^11 ohms, it takes about 50 seconds for the charge to almost completely disappear; at 10^10 ohms, about 5 seconds; and at 10^9 ohms, only about 0.5 seconds. However, they also write that getting to a state where charge disappears in under a second would require **very high humidity**.

ORIST also says that the mechanism by which humidity changes electrical resistance still needs further theoretical study. The explanation that charge "escapes through a water film" is widely used, but the details are still being researched.

### Why winter air tends to be dry

What we usually call "humidity" is **relative humidity**: how much water vapor the air currently holds, expressed as a percentage of the maximum it can hold at that temperature.

According to ORIST's materials, air at 15°C (59°F) and 70% relative humidity contains about 9 grams of water vapor per cubic meter. If that air cools to 3°C (37°F), the amount of water vapor it can hold drops to about 6 grams. Cold air simply can't hold much water vapor to begin with.

When that cold air is warmed up indoors, the amount of water vapor stays the same while the maximum it can hold goes way up, so the relative humidity drops. That's why indoor air tends to get dry in winter (we go into more detail in [our article on winter static electricity](/trivia/-wb2FoANwv0/)).

Humidifying does help charge escape more easily, but as we've seen, humidity alone can't eliminate static electricity. As the video says, it's probably best to think of humidifying as a "supplementary measure."

### Related reading

- [Why is static electricity more common in winter?](/trivia/-wb2FoANwv0/)
- [Why do windows fog up completely on winter mornings?](/trivia/6j7vUC-6rlE/)
- [Why can silica gel desiccant be reused again and again?](/trivia/WI2xa5RaFpc/)
