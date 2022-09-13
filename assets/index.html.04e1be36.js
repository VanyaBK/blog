import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as r,a as o,b as e,d as n,e as i,f as d,r as c}from"./app.ec83d88e.js";const l="/blog/assets/image1.25f11b5f.png",h="/blog/assets/image2.e005214f.png",p="/blog/assets/image3.73f91ab8.png",m="/blog/assets/image4.413904dd.png",g="/blog/assets/image5.57481ab1.png",u="/blog/assets/image6.6e66cf05.png",f="/blog/assets/image7.597c467e.png",b="/blog/assets/image8.85931773.png",y="/blog/assets/image9.730eb1eb.png",w="/blog/assets/image10.4085b287.png",v={},x=e("p",null,"This blog presents an easy fix to the sentence embeddings learned by pre-trained language models. It is based on the paper: On the Sentence Embeddings from Pre-trained Language Models by Li et al EMNLP 2020.",-1),_=i("Paper: "),T={href:"https://arxiv.org/abs/2011.05864",target:"_blank",rel:"noopener noreferrer"},E=i("https://arxiv.org/abs/2011.05864"),R=i(" Code: "),B={href:"https://github.com/bohanli/BERT-flow",target:"_blank",rel:"noopener noreferrer"},k=i("https://github.com/bohanli/BERT-flow"),L=d('<h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2><p>Recently, pre-trained language models and its variants like BERT have been widely used as representations of natural language.</p><p><img src="'+l+'" alt="image1"></p><p>Photo credit to https://towardsml.com/2019/09/17/bert-explained-a-complete-guide-with-theory-and-tutorial/</p><p>Despite their great success on many NLP tasks through fine-tuning, the sentence embeddings from BERT without finetuning are significantly inferior in terms of semantic textual similarity (Reimers and Gurevych, 2019) \u2013 for example, they even underperform the GloVe embeddings which are not contextualized and trained with a much simpler model. Such issues hinder applying BERT sentence embeddings directly to many real-world scenarios where collecting labeled data is highlycosting or even intractable.</p><p><img src="'+h+'" alt="image2"></p><h2 id="major-questions" tabindex="-1"><a class="header-anchor" href="#major-questions" aria-hidden="true">#</a> Major Questions</h2><p>In this paper, we aim to answer two major questions:</p><ul><li><p>(1) why do the BERT-induced sentence embeddings perform poorly to retrieve semantically similar sentences? Do they carry too little semantic information, or just because the semantic meanings in these embeddings are not exploited properly?</p></li><li><p>(2) If the BERT embeddings capture enough semantic information that is hard to be directly utilized, how can we make it easier without external supervision?</p></li></ul><h2 id="our-findings" tabindex="-1"><a class="header-anchor" href="#our-findings" aria-hidden="true">#</a> Our Findings</h2><p>We argue that the semantic information in the BERT embeddings is not fully exploited. We first reveal the theoretical connection between the masked language model pre-training objective and the semantic similarity task theoretically, and then analyze the BERT sentence embeddings empirically. We find that BERT always induces a non-smooth anisotropic semantic space of sentences, which harms its performance of semantic similarity.</p><h3 id="the-anisotropic-embedding-space-of-bert" tabindex="-1"><a class="header-anchor" href="#the-anisotropic-embedding-space-of-bert" aria-hidden="true">#</a> The Anisotropic Embedding Space of BERT</h3><p>Gao et al. (2019) and Wang et al. (2020) have pointed out that, for language modeling, the maximum likelihood training with Equation 1 usually produces an anisotropic word embedding space. \u201CAnisotropic\u201D means word embeddings occupy a narrow cone in the vector space. This phenomenon is also observed in the pretrained Transformers like BERT, GPT-2, etc (Ethayarajh, 2019).</p><p><img src="'+p+'" alt="image3"></p><div class="custom-container tip"><p class="custom-container-title">Tips</p><p>The BERT word embedding space. The 2D-scatterplot is achieved via SVD-based dimension reduction. The embeddings are colored according to their associated word frequency.</p></div><h3 id="word-frequency-biases-the-embedding-space" tabindex="-1"><a class="header-anchor" href="#word-frequency-biases-the-embedding-space" aria-hidden="true">#</a> Word Frequency Biases the Embedding Space</h3><p>However, as discussed by Gao et al. (2019), anisotropy is highly relevant to the imbalance of word frequency. We observe that high-frequency words are all close to the origin, while low-frequency words are far away from the origin.</p><p>This phenomenon can be explained through the softmax formulation of (masked) language models. Note that there is a word-frequency term in the decomposition of the dot product between context and word embeddings. Nevertheless, the PMI term is still highly associated with semantic similarity.</p><div style="text-align:center;"><img src="'+m+'" width="400"><img src="'+g+'" width="400"></div><div class="custom-container warning"><p class="custom-container-title">Remark</p><p>We expect the embedding induced similarity to be consistent to semantic similarity. If embeddings are distributed in different regions according to frequency statistics, the induced similarity is not useful any more.</p></div><p><img src="'+u+'" alt="image6"></p><h3 id="low-frequency-words-disperse-sparsely" tabindex="-1"><a class="header-anchor" href="#low-frequency-words-disperse-sparsely" aria-hidden="true">#</a> Low-Frequency Words Disperse Sparsely</h3><p>We also observe that, in the learned anisotropic embedding space, high-frequency words concentrates densely to their k-nearest neighbors and low-frequency words disperse sparsely.</p><p><img src="'+f+'" alt="image7"></p><div class="custom-container warning"><p class="custom-container-title">Remark</p><p>Due to the sparsity, many \u201Choles\u201D could be formed around the low-frequency words in the embedding space, where the semantic meaning can be poorly defined.</p></div><h2 id="proposed-method-bert-flow" tabindex="-1"><a class="header-anchor" href="#proposed-method-bert-flow" aria-hidden="true">#</a> Proposed Method: BERT-flow</h2><p>To address these issues, we propose to transform the anisotropic sentence embedding distribution to a smooth and isotropic Gaussian distribution through normalizing flows that are learned with an unsupervised objective.</p><p>A standard Gaussian latent space may have favorable properties which can help with our problem.</p><ul><li>First, standard Gaussian satisfies isotropy. By fitting a mapping to an isotropic distribution, the singular spectrum of the embedding space can be flattened. In this way, the word frequency-related singular directions, which are the dominating ones, can be suppressed.</li><li>Second, the probabilistic density of Gaussian is well defined over the entire real space. This means there are no \u201Chole\u201D areas, which are poorly defined in terms of probability. The helpfulness of Gaussian prior for mitigating the \u201Chole\u201D problem has been widely observed in existing literature of deep latent variable models (e.g., variational auto-encoders).</li></ul><p><img src="'+b+'" alt="image8"></p><h2 id="experiments" tabindex="-1"><a class="header-anchor" href="#experiments" aria-hidden="true">#</a> Experiments</h2><p>Experimental results show that our proposed BERT-flow method obtains significant performance gains over the state-of-the-art sentence embeddings on a variety of semantic textual similarity tasks.</p><h3 id="results-w-o-nli-supervision" tabindex="-1"><a class="header-anchor" href="#results-w-o-nli-supervision" aria-hidden="true">#</a> Results w/o NLI Supervision</h3><p>We perform extensive experiments on 7 standard semantic textual similarity benchmarks without using any downstream supervision. Our empirical results demonstrate that the flow transformation is able to consistently improve BERT by up to 12.70 points with an average of 8.16 points in terms of Spearman correlation between cosine embedding similarity and human annotated similarity.</p><p><img src="'+y+'" alt="image9"></p><h3 id="results-w-nli-supervision" tabindex="-1"><a class="header-anchor" href="#results-w-nli-supervision" aria-hidden="true">#</a> Results w/ NLI Supervision</h3><p>When combined with external supervision from NLI tasks, our method outperforms the <strong>sentence-BERT</strong> embeddings (Reimers and Gurevych, 2019), leading to new state-of-theart performance.</p><p><img src="'+w+'" alt="image10"></p><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><p>We investigate the deficiency of the BERT sentence embeddings on semantic textual similarity. We propose a flow-based calibration which can effectively improve the performance. BERT-flow obtains significant performance gains over the SoTA sentence embeddings on a variety of semantic textual similarity tasks.</p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2><ul><li>Bohan Li, Hao Zhou, Junxian He, Mingxuan Wang, Yiming Yang, Lei Li. On the Sentence Embeddings from Pre-trained Language Models. EMNLP 2020.</li><li>Nils Reimers and Iryna Gurevych. 2019. SentenceBERT: Sentence embeddings using siamese BERT networks. In Proceedings of EMNLP-IJCNLP.</li><li>Jun Gao, Di He, Xu Tan, Tao Qin, Liwei Wang, and TieYan Liu. 2019. Representation degeneration problem in training natural language generation models. In Proceedings of ICLR.</li><li>Lingxiao Wang, Jing Huang, Kevin Huang, Ziniu Hu, Guangtao Wang, and Quanquan Gu. 2020. Improving neural language generation with spectrum control. In Proceedings of ICLR.</li><li>Kawin Ethayarajh. 2019. How contextual are contextualized word representations? comparing the geometry of bert, elmo, and gpt-2 embeddings. In Proceedings of EMNLP-IJCNLP.</li></ul>',42);function q(I,N){const a=c("ExternalLinkIcon");return s(),r("div",null,[x,o(" more "),e("p",null,[_,e("a",T,[E,n(a)]),R,e("a",B,[k,n(a)])]),L])}const G=t(v,[["render",q],["__file","index.html.vue"]]);export{G as default};
