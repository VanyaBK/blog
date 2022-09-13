import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as s,a as o,b as e,d as n,e as t,f as l,r as d}from"./app.ec83d88e.js";const h="/blog/assets/zhao.b4463c4d.png",c="/blog/assets/bert-gpt.76e11be6.png",g="/blog/assets/mass.12967ac6.png",u="/blog/assets/language-learn.f25692d1.png",m="/blog/assets/language-learn-2.fae837c6.png",p="/blog/assets/uni-representation.745d0cb1.png",f="/blog/assets/en-de.aaea198d.png",y="/blog/assets/en-fr.c47f7df2.png",b="/blog/assets/exotic.42e62de8.png",v="/blog/assets/analysis-en-zh-direct.07a28907.png",w="/blog/assets/analysis-en-zh-mrasp.198ba351.png",x="/blog/assets/analysis-1.17c01bd5.png",A="/blog/assets/analysis-2.da05b727.png",R="/blog/assets/analysis-3.6d1294da.png",P={},S=e("p",null,`\u200B In 1920, the great philosopher Bertrand Russell visited China, accompanied by Yuen Ren Chao, a Chinese-American linguist. Mr. Chao was a naturally gifted polyglot. At that time, he could already speak Baoding dialect, Wu dialect, Fuzhou dialect, Nanjing dialect, and English. He accompanied Russell from Shanghai to Changsha by ship. During the trip, he was learning Changsha dialect from Yang Ruiliu, an economist on the same ship. When the ship docked in Changsha, Yuen Ren Chao was already able to translate Russell's speeches and slang into Changsha dialect. Can our neural network become a model like "Yuen Ren Chao" on machine translation? That is, to create a unified model with multilingual abilities, and when encountering new languages, the model could quickly adapt to translating new ones after training with a small amount of data.`,-1),T=e("p",null,"Reading Time: About 15 minutes.",-1),q=t("Paper\uFF1A"),k={href:"https://arxiv.org/abs/2010.03142",target:"_blank",rel:"noopener noreferrer"},_=t("https://arxiv.org/abs/2010.03142"),E=t("Github: "),B={href:"https://github.com/linzehui/mRASP",target:"_blank",rel:"noopener noreferrer"},L=t("https://github.com/linzehui/mRASP"),F=l('<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2><p><img src="'+h+'" alt="image1"></p><p>A recent work mRASP, which appeared at the 2020 Conference of Empirical Methods in Natural Language Processing, aims to provide a Yuen Ren Chao polyglot model for machine translation [1]. The key idea is to pre-train a model with multilingual capability, and yield any specific translation model by fine-tuning on the corresponding parallel corpus. The model trained with mRASP technique in 32 languages has achieved a comprehensive and significant improvement in 47 translation test sets.</p><p>Unlike previous translation models, mRASP has established a successful paradigm of pre-training and fine-tuning for machine translation. This is similar to BERT&#39;s role on NLU tasks. There were already pretrained models for natural language generation (GPT). However, they are limited in extending their capabilities on multilingual machine translation tasks. The central problem that mRASP wants to solve is, can we develop a unified pre-trained translation model and extend it by fine-tuning on a small amount of parallel corpus on any specific language pair to obtain any-language translation model?</p><p>mRASP is designed for machine translation tasks. It has three advantages. First, the translation quality can be consistently improved regardless of the amount of parallel bilingual corpus. In rich-resource directions, such as the standard English-French wmt2014 translation task, which already has 40 million parallel sentence pairs for training, mRASP can still significantly improve the quality, reaching a BLEU score of 44.3. In low-resource directions, mRASP performs surprisingly well. In extreme cases, when we have only 10,000 training data for fine-tuning, a reasonable translation model can be obtained through 10-minute fine-tuning. Second, It breaks the limit on languages, for any direction, the mRASP can be directly used to fine-tune to get a single-directional translation model. Finally, it is resource-efficient. Some other pre-training paradigms are trained on hundreds of GPUs for a couple of weeks. By contrast, mRASP only needs 8 GPUs for a week. In short, mRASP can be understood as a lightweight BERT in the field of machine translation. When you need a machine translation model, you should try it, it may surprise you! The authors also said that this technology has been used on the Volctrans system developed by ByteDance and has been tested in actual business practice. The authors have kindly published the research data, codes and pre-trained models.</p><p>Next, we will introduce and analyze mRASP from three aspects: 1) the challenges of machine translation pre-training; 2) the motivation and methods of mRASP; 3) the performance and analysis of mRASP.</p><h2 id="challenges-in-machine-translation-pre-training" tabindex="-1"><a class="header-anchor" href="#challenges-in-machine-translation-pre-training" aria-hidden="true">#</a> Challenges in machine translation pre-training</h2><p>At present, the vast majority of AI tasks are basically statistical learning based on data, and the performance of the model depends on the quality and quantity of data to a large extent. It has become a new successful paradigm for NLP to use a large amount of cheap data to pre-train the model, then fine-tune with a small amount of annotation data in specific scenarios. For example, pre-trained on large-scale unlabeled text, BERT[2] can achieve good results on 11 NLU tasks after fine-tuning on limited annotation data. However, in multilingual machine translation, the paradigm of pre-training and fine-tuning has not yet achieved general success. The training objectives of previous NLP pre-training methods such as BERT and GPT[5] have a large gap with machine translation, thus are not easy to use directly. mRASP proposed a new idea: it uses massive bilingual parallel corpus accumulated in multiple languages to jointly train a unified model, and then fine-tune based on it. Therefore the pre-training and fine-tuning objectives are as close as possible, so as to give greater play to the role of the pre-training model.</p><p><img src="'+c+'" alt="image2"></p><p><img src="'+g+'" alt="image3"></p><p>The above figure compares and analyzes the limitations of the previous NLP pre-training paradigms in machine translation scenarios. BERT and GPT respectively correspond to the pre-training of the Transformer[6] encoder part and the decoder part, while machine translation uses the whole sequence-to-sequence model. Only part of the parameters of the translation model are initialized due the inconsistency in model structure. Therefore it will be difficult to effectively play the role of pre-training. As a result, it requires a lot of special skills to be improved [10].</p><p>Researchers soon proposed frameworks such as MASS [7] and BART [8] to extend pre-training to sequence-to-sequence tasks. They use auto-encoder for self-learning and have achieved significant results in many downstream NLG tasks. However, there are still two important problems when applying them in machine translation: 1) They brings no improvement in rich-resource languages (such as English, German, English and French). 2) There is no way to extend to multilingual translation tasks. This limitation is largely due to the fact that autocoding is a relatively simple task so it is difficult to learn a deeper representation. By contrast, machine translation requires a more complex semantic transformation. The training objective discrepancy between pre-training and fine-tuning makes it difficult for the model to make the best use of training data. It has become an important challenge to overcome the two problems for the application of pre-training paradigms in the field of machine translation.</p><h2 id="motivation-and-techniques-of-mrasp" tabindex="-1"><a class="header-anchor" href="#motivation-and-techniques-of-mrasp" aria-hidden="true">#</a> Motivation and Techniques of mRASP</h2><p>\u200BFor language learners, a very interesting phenomenon is that after learning three or four languages, the speed of learning a new language will accelerate. For example, if an English native speaker learns German and French separately, he/she may take one year each. However, if he learns German first and then learns French, he/she may only take one year and three months to learn it. If he/she learns Spanish subsequently, the speed may be faster [3]. The same is true for learning programming languages. Learning C ++ may take one year. Learning Java, Python subsequently may only take one month. A simple explanation is that in the process of multilingual learning, human beings will spontaneously summarize the abstract commonalities among languages and focus on learning the characteristics of new languages. Therefore, in order to improve personal language learning ability, it is often necessary to learn more languages, to have a more accurate grasp of language commonalities, instead of desperately learning one language. By the same token, for machine translation, it has become a very interesting question whether the translation ability can be transferred to different languages so that the information between different languages can be utilized for each other.</p><p><img src="'+u+'" alt="image4"></p><p><img src="'+m+`" alt="image5"></p><p>The design goal of mRASP is based on such considerations: design a general pre-trained model to learn the commonalities of transformation between languages, and then it will be easier to migrate to the new translation direction. Just like language learners, after learning two languages, the third language becomes easier. The design of mRASP follows two basic principles: first, the training objective of pre-training is the same as machine translation, and it is necessary to learn the transformation ability between languages; second, learn the universal representation of the language as much as possible, if the semantics of cross-lingual sentences or words are close, the representation should also be close.</p><p>mRASP follows a common pre-training-fine-tuning framework. In the pre-training stage, unlike the traditional pre-training model in which massive unsupervised monolingual data are used, mRASP takes a different approach: it puts multilingual parallel data into the same model for joint training. The Transformer architecture is adopted, plus a language identifier (Language token) to identify the source language and the target language. In order to ensure that sentences and words in different languages could be embedded in the neighbor space, sentences with the same meaning, random alignment substitution (RAS) is introduced to create a richer context.</p><p>There is a certain probability that &quot;\u7231&quot;(Chinese) in a Chinese sentence &quot;\u6211 \u7231 \u5317\u4EAC \u5929\u5B89\u95E8&quot; will be replaced by &quot;aime&quot; (French), and &quot;\u5317\u4EAC&quot;(Chinese) will also be replaced by &quot;P\xE9kin&quot; (French), so the original sentence becomes &quot;I aime P\xE9kin Tiananmen.&quot; A pair of parallel sentence pairs in the training set can be expanded into two pairs (even three pairs, four pairs,......)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u6211 \u7231 \u5317\u4EAC \u5929\u5B89\u95E8 ==&gt; I love Beijing Tiananmen Square
\u6211 aime P\xE9kin \u5929\u5B89\u95E8 ==&gt; I love Beijing Tiananmen Square
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>For the model, by learning from abundant parallel corpus, it will naturally learn the correspondence between synonyms across different languages according to this &quot;artificially created context&quot;. In fact, RAS based on parallel dictionaries has bridge the representation gap of synonyms across different languages. In the above example, the word vector expectations calculated by &quot;\u7231&quot;(&#39;love&#39; in Chinese) and &quot;aime&quot;(&#39;love&#39; in French) are as close as possible.</p><p><img src="`+p+'" alt="image6"></p><p>In the fine-tuning stage, we initialize the parameters with mRASP, and then we adopt the same training method as the traditional single-directional machine translation. Therefore, using mRASP does not require any additional skills. For a detailed introduction, please refer to the paper[1].</p><h2 id="effectiveness-of-mrasp" tabindex="-1"><a class="header-anchor" href="#effectiveness-of-mrasp" aria-hidden="true">#</a> Effectiveness of mRASP</h2><p>mRASP uses parallel corpus of 32 languages to-and-from English for pre-training. When we only use parallel corpus of English to French wmt14 for fine-tuning, it achieves 44.3 BLEU without laborious Back Translation of massive monolingual corpus. Moreover, when applied to a new translation direction Dutch (Nl) to Portuguese (Pt), with only 12,000 parallel sentence pairs for fine-tuning, mRASP gets a reasonable (BLEU 10 +) model in ten minutes. By contrast, training any usable MT model from scratch using the equivalent parallel sentence pairs is impossible (BLEU is close to 0).</p><p>In summary, mRASP has the following advantages:</p><ol><li>Easy to reproduce</li></ol><p>The pre-training of mRASP only requires a total of 110 million parallel sentence pairs (the same pair of parallel sentence is applicable to both directions, resulting in a total of 220 million training samples), and the vocabulary only has 64k bpe subword tokens. Compared with other pre-training methods, in which tens of billions of data and dozens of layers are frequently used, the training process is less difficult. We can complete the pre-training process on 32 languages in less than a week using 8 GPUs. By the way, support for more languages can also be simply expanded.</p><ol start="2"><li>Highly Versatile</li></ol><p>Compared with the single-directional machine translation models, mRASP brings a consistent improvement in rich, medium and low-resource scenarios. Even for English to French direction where we have the largest parallel corpus, the translation quality is further improved by 1.1 BLEU. More surprisingly, for Dutch to Portuguese direction that have never been seen in the pre-training data, a significant improvement of 10 + BLEU has also been achieved.</p><p>Here are some representative experimental results:</p><h3 id="_1-en-de-and-en-fr-benchmarks" tabindex="-1"><a class="header-anchor" href="#_1-en-de-and-en-fr-benchmarks" aria-hidden="true">#</a> 1. En-De and En-Fr Benchmarks</h3><p>The following figure compares the effect of mRASP on En-De and En-Fr with several concurrent cross-lingual pre-training models. It can be seen that mRASP has certain advantages: it reaches 30.3 (tokenized BLEU) on En-&gt;De wmt 2016 test set, 44.3 (tokenized BLEU) on En-&gt;Fr wmt 2014 test set. CTNMT uses BERT pre-training. MASS introduces large-scale monolingual data. mBERT is a multilingual BERT model. mBART is another pre-training method that is proposed concurrently, it uses massive multilingual monolingual data, and is trained on 256 GPUs for 20 days.</p><p><img src="'+f+'" alt="image7"></p><p><img src="'+y+'" alt="image8"></p><h3 id="_2-extend-to-language-not-seen-during-the-pre-training-phase" tabindex="-1"><a class="header-anchor" href="#_2-extend-to-language-not-seen-during-the-pre-training-phase" aria-hidden="true">#</a> 2. Extend to language not seen during the pre-training phase</h3><p>Directions that are not included in parallel pairs during the pre-training stage, are also referred as &quot;Exotic Directions&quot;. Whether mRASP is effective on Exotic Directions, determines whether mRASP has good generalization capabilities.</p><p>The Exotic Directions are divided into four situations in the paper:</p><ul><li>Exotic Pair: Both the source language and the target language have been individually pre-trained, but the model has not yet seen the bilingual pairs of them</li><li>Exotic Source: The model has only seen the target language in the pre-training stage, and the source language has not been seen at all</li><li>Exotic Target: The model has only seen the source language in the pre-training stage, and the target language has not been seen at all</li><li>Exotic Full: The model has not seen the source language or the target language at all in the pre-training stage</li></ul><p>It is difficult to train machine translation under the circumstances. Of course, the most difficult one is the last one, which is equivalent to requiring people who have never learned Latin and Hindi to read a few sentences in Latin and Hindi then translate between them.</p><table><thead><tr><th style="text-align:center;">Category</th><th style="text-align:center;">Source language seen during pre-training?</th><th style="text-align:center;">Target language seen during pre-training?</th><th style="text-align:center;">Language pair seen during pre-training?</th></tr></thead><tbody><tr><td style="text-align:center;">Exotic Pair</td><td style="text-align:center;">\u2714</td><td style="text-align:center;">\u2714</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Exotic Source</td><td style="text-align:center;">X</td><td style="text-align:center;">\u2714</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Exotic Target</td><td style="text-align:center;">\u2714</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr><tr><td style="text-align:center;">Exotic Full</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td><td style="text-align:center;">X</td></tr></tbody></table><p>It is worth noting that both sides of Fr-Zh have appeared separately, but they have not appeared as parallel pairs. mRASP achieves a 20 + BLEU score after fine-tuning on 20K parallel corpus.</p><p>For Exotic Full scenario, such as Dutch to Portuguese (Nl-Pt), only 12,000 parallel corpora are used, and after about 10 minutes of training, you can achieve a 10+ BLEU score.</p><p><img src="'+b+'" alt="image9"></p><h3 id="_3-case-study" tabindex="-1"><a class="header-anchor" href="#_3-case-study" aria-hidden="true">#</a> 3. Case study</h3><p>In order to understand the effect of mRASP more intuitively, the authors also make a case study in the paper.</p><h4 id="french-chinese-fr-zh" tabindex="-1"><a class="header-anchor" href="#french-chinese-fr-zh" aria-hidden="true">#</a> French-Chinese(Fr-Zh)</h4><ul><li>Exotic Pair, 20k Parallel Sentence Pair</li><li>Direct (0.7 BLEU) is much weaker than mRASP (25.8 BLEU)</li></ul><p>The Direct system does not work at all, while the mRASP system translates well.</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:left;">Original Text</th><th style="text-align:left;">Translation in English</th></tr></thead><tbody><tr><td style="text-align:center;">source</td><td style="text-align:left;">Ordre du jour provisoire de la 7424e s\xE9ance ( priv\xE9e ) du Conseil</td><td style="text-align:left;">Provisional agenda for the 7424th (closed) meeting of the Council</td></tr><tr><td style="text-align:center;">target</td><td style="text-align:left;">\u5B89\u5168 \u7406\u4E8B\u4F1A \u7B2C 7424 \u6B21 ( \u95ED\u95E8 ) \u4F1A\u8BAE \u4E34\u65F6 \u8BAE\u7A0B</td><td style="text-align:left;">Security Council, 7424th (closed) meeting, provisional, agenda</td></tr><tr><td style="text-align:center;">Direct</td><td style="text-align:left;">\u4E8B\u5B9E\u4E0A \uFF0C \u56FD\u9645 \u8D27\u5E01 \u57FA\u91D1 \u7EC4\u7EC7 \u7684 \u56FD\u9645 \u8D27\u5E01 \u57FA\u91D1 \u7EC4\u7EC7 \uFF08 IMF \uFF09</td><td style="text-align:left;">In fact, international, monetary, fund, organization, international, monetary, fund, organization (IMF)</td></tr><tr><td style="text-align:center;">mRASP</td><td style="text-align:left;">\u5B89\u7406\u4F1A \u7B2C 7424 \u6B21 \uFF08 \u975E \u516C\u5F00 \uFF09 \u4F1A\u8BAE \u4E34\u65F6 \u8BAE\u7A0B</td><td style="text-align:left;">Council, 7424th (closed) meeting, provisional, agenda</td></tr></tbody></table><h4 id="dutch-portuguese-nl-pt" tabindex="-1"><a class="header-anchor" href="#dutch-portuguese-nl-pt" aria-hidden="true">#</a> Dutch-Portuguese (Nl-Pt)</h4><ul><li>Exotic Full, 12,000 parallel sentence pairs</li><li>Direct 0 BLEU vs mRASP 14.1 BLEU</li></ul><p>We find that the translation system obtained by mRASP can not successfully translate every detail, but it can grasp the key information of the original text. For example, in the following example (1) date (2) minutes of the meeting &lt;-&gt; news of meeting (3) circulated &lt;-&gt; shared.</p><table><thead><tr><th style="text-align:center;"></th><th style="text-align:left;">Original Text</th><th style="text-align:left;">Translation in English</th></tr></thead><tbody><tr><td style="text-align:center;">source</td><td style="text-align:left;">de notulen van de vergadering van donderdag 21 september zijn rondgedeeld.</td><td style="text-align:left;">The minutes of the meeting on Thursday, 21 September have been circulated.</td></tr><tr><td style="text-align:center;">target</td><td style="text-align:left;">a acta da sess\xE3o de quinta feira , 21 de setembro de 2000 , j\xE1 foi distribu\xEDda.</td><td style="text-align:left;">The minutes of the meeting on Thursday, 21 September 2000 have now been distributed.</td></tr><tr><td style="text-align:center;">Direct</td><td style="text-align:left;">Os governos, os l\xEDderes mundiais dos seus pr\xF3prios.</td><td style="text-align:left;">Governments, their own world leaders.</td></tr><tr><td style="text-align:center;">mRASP</td><td style="text-align:left;">As not\xEDcias da reuni\xE3o do dia 21 de Setembro foram partilhadas.</td><td style="text-align:left;">News of the September 21 meeting has been shared.</td></tr></tbody></table><h4 id="english-french-en-fr" tabindex="-1"><a class="header-anchor" href="#english-french-en-fr" aria-hidden="true">#</a> English-French (En-Fr)</h4><ul><li>We found that one of the advantages of the model trained by the mRASP method over the Direct method is that the Direct system tends to ignore meaningless words (such as articles, deixis, etc.), while the mRASP maintains the consistency of articles and deixis.</li></ul><table><thead><tr><th style="text-align:center;"></th><th style="text-align:left;">Text</th></tr></thead><tbody><tr><td style="text-align:center;">source</td><td style="text-align:left;">An investigation is under way to find the cause of the fire .</td></tr><tr><td style="text-align:center;">target</td><td style="text-align:left;">Une enqu\xEAte est en cours pour trouver la cause de cet incendie .</td></tr><tr><td style="text-align:center;">Direct</td><td style="text-align:left;">enqu\xEAte est en cours pour d\xE9terminer la cause de l&#39; incendie .</td></tr><tr><td style="text-align:center;">mRASP</td><td style="text-align:left;">Une enqu\xEAte est en cours pour trouver la cause de l&#39; incendie .</td></tr></tbody></table><table><thead><tr><th style="text-align:center;"></th><th style="text-align:left;">Text</th></tr></thead><tbody><tr><td style="text-align:center;">source</td><td style="text-align:left;">After Broadway and London , Paris is finally finding its voice .</td></tr><tr><td style="text-align:center;">target</td><td style="text-align:left;">Apr\xE8s Broadway et Londres , Paris trouve enfin sa voix .</td></tr><tr><td style="text-align:center;">Direct</td><td style="text-align:left;">Broadway et Londres , Paris trouve enfin sa voix .</td></tr><tr><td style="text-align:center;">mRASP</td><td style="text-align:left;">Apr\xE8s Broadway et Londres , Paris trouve enfin sa voix .</td></tr></tbody></table><h4 id="english-chinese-en-zh" tabindex="-1"><a class="header-anchor" href="#english-chinese-en-zh" aria-hidden="true">#</a> English-Chinese (En-Zh)</h4><table><thead><tr><th style="text-align:center;"></th><th style="text-align:left;">Original Text</th><th style="text-align:left;">Translation in English</th></tr></thead><tbody><tr><td style="text-align:center;">source</td><td style="text-align:left;">and for the middle class.</td><td style="text-align:left;"></td></tr><tr><td style="text-align:center;">target</td><td style="text-align:left;">\u5BF9\u4E2D\u4EA7\u9636\u7EA7\u800C\u8A00\u3002</td><td style="text-align:left;">For the middle class.</td></tr><tr><td style="text-align:center;">Direct</td><td style="text-align:left;">\u8FD8\u6709\u4E2D\u4EA7\u9636\u7EA7\u3002</td><td style="text-align:left;">And the middle class.</td></tr><tr><td style="text-align:center;">mRASP</td><td style="text-align:left;">\u5BF9\u4E2D\u4EA7\u9636\u7EA7\u800C\u8A00\u3002</td><td style="text-align:left;">For the middle class.</td></tr></tbody></table><h3 id="findings-from-mrasp-trained-model" tabindex="-1"><a class="header-anchor" href="#findings-from-mrasp-trained-model" aria-hidden="true">#</a> Findings from mRASP trained model</h3><p>As a general pre-training model, where does the improvements of mRASP for downstream MT tasks come from?</p><p>The author believes that its improvements mainly comes from two aspects:</p><ol><li>mRASP narrows the gap between the vector representation of synonyms across different languages</li><li>mRASP narrows the gap between the vector representation of synonymous sentences across different languages</li></ol><p>The narrowing of the gap between word-level and sentence-level representations means that after learning parallel sentence pairs in a large number of languages in the pre-training stage, mRASP implicitly &quot;mastered&quot; the language-independent representation, which can be migrated to any language, so mRASP can generally improve the effect of downstream machine translation tasks.</p><h4 id="_1-mrasp-draws-word-level-vector-representation-of-different-language-closer" tabindex="-1"><a class="header-anchor" href="#_1-mrasp-draws-word-level-vector-representation-of-different-language-closer" aria-hidden="true">#</a> 1. mRASP draws word-level vector representation of different language closer</h4><p>RAS is introduced by making the same context shared between synonyms across different languages. Since the word vector is determined by the context, RAS further draws the representation of synonyms across different languages closer.</p><p>Up: w/o RAS, Down: w/ RAS</p><p>It can be seen that with the RAS method, the embedding distribution between different languages is drawn closer (the angle becomes smaller).</p><p><img src="'+v+'" alt="image10"></p><p><img src="'+w+'" alt="image11"></p><h4 id="_2-mrasp-draws-sentence-level-vector-representation-of-different-language-closer" tabindex="-1"><a class="header-anchor" href="#_2-mrasp-draws-sentence-level-vector-representation-of-different-language-closer" aria-hidden="true">#</a> 2. mRASP draws sentence-level vector representation of different language closer</h4><p>mRASP narrows the gap between the representation of synonyms, as well as the vector representation of semantics.</p><p>We use the encoder output vector as the representation of the sentence (L2 normalized averaged-pooled encoded output). From the TED parallel test set (filtered 15-way parallel test set, a total of 2284), we match the nearest sentence based on similarity score (cosine similarity), then calculate the Top-1 accuracy (sentence retrieval accuracy).</p><p>Figure 1: The accuracy of mRASP minus the accuracy of mBART [9]. Note that Dutch (Nl) has never appeared in the mRASP pre-training data, and the accuracy in other directions is much higher than that of mBART.</p><ul><li>The average accuracy of mRASP retrieval reached 76%</li></ul><p>Figure 2: Accuracy of mRASP minus the accuracy of mRASP w/o RAS. It can be seen that RAS has obvious benefits on languages (Nl) that did not appear in the pre-training stage.</p><p>Figure 3: After removing the language identifier (Language token) at the beginning of the sentence, the accuracy of Nl can be further improved, at a sacrifice that the accuracy of other languages is greatly reduced.</p><p><img src="'+x+'" alt="image12"></p><p><img src="'+A+'" alt="image13"></p><p><img src="'+R+'" alt="image14"></p><p>It can be seen that RAS does further draws closer the semantic vector representation, and synonymous sentences will be closely represented after mRASP.</p><h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary" aria-hidden="true">#</a> Summary</h2><p>Back to the beginning of the article, Mr. Chao, a language genius, has mastered 33 dialects plus 7 foreign languages in his life. From Baoding in the north China to Fuzhou in the south, from the upper reaches to the lower reaches of the Yangtze River, from Berkeley in the United States to Paris in France, he can speak local languages with a local accent. And the establishment of a unified multilingual and cross-domain translation model is one of the ultimate goals of machine translation research. mRASP, which is in line with the language genius Yuen Ren Chao, has established a successful path from multilingual pre-training to fine-tuning to multiple machine translation models, which will also become a new paradigm of machine translation. ByteDance has applied this technology to the Volctrans system and you can try it in the web page attached at the end of the text. We are looking forward to the continuous emergence of new methods in this direction, making great strides towards the ultimate machine translation goal. In the next few years, the progress of machine translation can help everyone in dozens of countries become &quot;Yuen Ren Chao&quot; and truly communicate without language barriers.</p><h2 id="references" tabindex="-1"><a class="header-anchor" href="#references" aria-hidden="true">#</a> References</h2><p>[1] Lin, Zehui, et al. &quot;Pre-training Multilingual Neural Machine Translation by Leveraging Alignment Information.&quot; In the Conference on Empirical Methods in Natural Language Processing (2020).</p><p>[2] Devlin, Jacob, et al. &quot;Bert: Pre-training of deep bidirectional transformers for language understanding.&quot; NAACL-HLT (1) 2019: 4171-4186.</p><p>[3] Thomas, Reed, and Callie Mady. &quot;Teaching for transfer: Insights from theory and practices in primary-level French-second-language classrooms.&quot; McGill Journal of Education/Revue des sciences de l&#39;\xE9ducation de McGill 49.2 (2014): 399-416.</p><p>[4] Johnson, Melvin, et al. &quot;Google\u2019s multilingual neural machine translation system: Enabling zero-shot translation.&quot; Transactions of the Association for Computational Linguistics 5 (2017): 339-351.</p><p>[5] Radford, Alec, et al. &quot;Improving language understanding by generative pre-training.&quot; (2018): 12.</p><p>[6] Vaswani, Ashish, et al. &quot;Attention is all you need.&quot; Advances in neural information processing systems. 2017.</p><p>[7] Song, Kaitao, et al. &quot;MASS: Masked Sequence to Sequence Pre-training for Language Generation.&quot; ICML. 2019.</p><p>[8] Lewis, Mike, et al. &quot;Bart: Denoising sequence-to-sequence pre-training for natural language generation, translation, and comprehension.&quot; ACL 2020: 7871-7880</p><p>[9] Liu, Yinhan, et al. &quot;Multilingual denoising pre-training for neural machine translation.&quot; TACL.2020</p><p>[10] Yang, et al. &quot;Towards Making the Most of BERT in Neural Machine Translation&quot; AAAI.2020</p>',95);function C(I,D){const a=d("ExternalLinkIcon");return r(),s("div",null,[S,o(" more "),T,e("p",null,[q,e("a",k,[_,n(a)])]),e("p",null,[E,e("a",B,[L,n(a)])]),F])}const N=i(P,[["render",C],["__file","index.html.vue"]]);export{N as default};
