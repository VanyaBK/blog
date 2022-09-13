import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as r,a as s,b as e,d as o,e as n,f as l,r as c}from"./app.ec83d88e.js";const d="/blog/assets/image1.ca2d0c20.png",h="/blog/assets/image2.2bcb3774.png",g="/blog/assets/image3.d44574c5.png",m="/blog/assets/image4.90bf832d.png",p="/blog/assets/image5.88bdf792.png",u="/blog/assets/image6.9dc268dc.png",f="/blog/assets/image7.3f9c9c75.png",b="/blog/assets/image8.4f475e65.png",y="/blog/assets/image9.0be54f66.png",v={},w=e("p",null,[n("The task of identifying semantic relations between entities from text, namely relation extraction (RE), plays a crucial role in a variety of knowledge-based applications. Previous methods focus on sentence-level RE, which predicts relations among entities in a single sentence. However, sentence-level RE models suffer from an inevitable limitation \u2013 they fail to recognize relations between entities across sentences. Hence, "),e("strong",null,"extracting relations at the document-level is necessary"),n(" for a holistic understanding of knowledge in text. This blog describes a recent work on document-level relation extraction by Zeng et al. EMNLP 2020.")],-1),E=e("p",null,[e("img",{src:d,alt:"image1"})],-1),T=n("Paper: "),R={href:"https://arxiv.org/abs/2009.13752",target:"_blank",rel:"noopener noreferrer"},x=n("https://arxiv.org/abs/2009.13752"),I=n(" Code: "),_={href:"https://github.com/DreamInvoker/GAIN",target:"_blank",rel:"noopener noreferrer"},G=n("https://github.com/DreamInvoker/GAIN"),N=l('<h2 id="challenges" tabindex="-1"><a class="header-anchor" href="#challenges" aria-hidden="true">#</a> Challenges</h2><p>There are several major challenges in effective relation extraction at the document-level. The figure below shows an example.</p><div align="center"><img src="'+h+'" width="50%" height="50%"></div><ol><li>The subject and object entities involved in a relation may appear in different sentences, e.g., the relation between <strong>Baltimore</strong> and <strong>U.S.</strong>, as well as <strong>Eldersburg</strong> and <strong>U.S</strong>.</li><li>The same entity may be mentioned multiple times in different sentences.</li><li>The identification of many relations requires techniques of logical reasoning, e.g., <strong>Eldersburg</strong> belongs to <strong>U.S.</strong> because <strong>Eldersburg</strong> is located in <strong>Maryland</strong>, and <strong>Maryland</strong> belongs to <strong>U.S.</strong>.</li></ol><h2 id="our-proposed-model-gain" tabindex="-1"><a class="header-anchor" href="#our-proposed-model-gain" aria-hidden="true">#</a> Our proposed Model: GAIN</h2><p>To tackle the challenges, we propose <strong>G</strong>raph <strong>A</strong>ggregation-and-<strong>I</strong>nference <strong>N</strong>etwork (<strong>GAIN</strong>). GAIN consists of double graph, i.e., mention-level graph and entity-level graph. Our intuitions are that: 1) Mention-level graph can model the interactions among mentions across sentences, so that global context can be better captured. 2) Entity-level graph can conduct logical reasoning for certain entity pairs over entities.</p><p><img src="'+g+'" alt="image3"></p><p>Our model contains the following four modules.</p><p><strong>Encoding module</strong>. Tokens of the document is represented as the concatenation of word embedding, entity type embedding, and entity id embedding. Then they are fed into the encoder (e.g., LSTM or BERT) to obtain the contextualized representation.</p><p><strong>Mention-level Graph Aggregation Module</strong>. To model the document-level information and interactions among mentions, a heterogeneous mention-level graph is constructed followed by graph convolution network. The graph has two kinds of nodes: 1) <em>Mention node</em>, which refers to one specific entity mention in the document; 2) <em>Document node</em>, which aims to model the overall document information and serves as a pivot for interactions among different mentions. Three types of edges are leveraged to connect these nodes:</p><ul><li><p><em>Intra-Entity Edge</em>: Mentions referring to the same entity are fully connected with intra-entity edges. In this way, the interaction among different mentions of the same entity could be modeled.</p></li><li><p><em>Inter-Entity Edge</em>: Two mentions of different entities are connected with an inter-entity edge if they co-occur in a single sentence. In this way, interactions among entities could be modeled by co-occurrences of their mentions.</p></li><li><p><em>Document Edge</em>: All mentions are connected to the document node with the document edge. With such connections, the document node can attend to all the mentions and enable interactions between document and mentions. Besides, the distance between two mention nodes is at most two with the document node as a pivot. Therefore long-distance dependency can be better modeled.</p></li></ul><p><strong>Entity-level Graph Inference Module</strong>. To explicitly capture the logic reasoning chain of entity pairs over all the entities, we constuct an entity-level graph by merging mention nodes referring to the same entity in the mention-level graph into an entity node. Concretely, to model the logical chain between a certain entity pair, we find out all the two-hop paths between them, in which a path is represented as the concatenation of both forward and backward edges. Then we levelrage attention mechanism to aggregate multiple paths into a reasoning-aware path representation.</p><p><strong>Classification Module</strong>. Since a pair of entities may contain multiple relations, we formulate the task as a multi-label classification. Concretely, we first concatenate the entity, document, and path representations. Then we feed it into a MLP and use sigmoid function to predict the score for all possible relations.</p><p><img src="'+m+'" alt="image4"></p><h2 id="experiments" tabindex="-1"><a class="header-anchor" href="#experiments" aria-hidden="true">#</a> Experiments</h2><h3 id="dataset" tabindex="-1"><a class="header-anchor" href="#dataset" aria-hidden="true">#</a> Dataset</h3><p>We evaluate our model on DocRED (Yao et al., 2019), a large-scale human-annotated dataset for document-level RE constructed from Wikipedia and Wikidata. DocRED has 96 relations types, 132, 275 entities, and 56, 354 relational facts in total. Documents in DocRED contain about 8 sentences on average, and more than 40.7% relation facts can only be extracted from multiple sentences. Moreover, 61.1% relation instances require various inference skills such as logical inference (Yao et al., 2019). we follow the standard split of the dataset, 3, 053 documents for training, 1, 000 for development and 1, 000 for test.</p><h3 id="main-results" tabindex="-1"><a class="header-anchor" href="#main-results" aria-hidden="true">#</a> Main Results</h3><p>We compare the performance among the following models:</p><ul><li><strong>CNN</strong>, <strong>LSTM</strong>, <strong>BiLSTM</strong>, <strong>Context-Aware</strong>, <strong>BERT-RE</strong>, <strong>RoBERTa-RE</strong>, <strong>CorefBERT-RE</strong>, <strong>CorefRoBERTa-RE</strong>: Using different encoding mechanisms to simply encode the whole document and extract relations.</li><li><strong>HIN-Glove</strong>, <strong>HIN-BERT</strong>: Extracting relations through a hierarchical interaction network with either Glove embedding or BERT.</li><li><strong>GAT</strong>, <strong>GCNN</strong>, <strong>EOG</strong>, <strong>AGGCN</strong>, <strong>LSR-Glove</strong>, <strong>LSR-BERT</strong>: Previous graph-based methods, while our graph construction is totally different from theirs and they conduct logical reasoning only based on GCN.</li><li><strong>GAIN-Glove</strong>, <strong>GAIN-BERT</strong>: Our proposed model with either Glove embedding or BERT.</li></ul><p>The evaluation metrics we use are F1/AUC and Ign-F1/Ign-AUC. The latter means we do not consider the triples (i.e., head-relation-tail) that are already contained in the training set.</p><p><img src="'+p+'" alt="image5"></p><p>The key observations are:</p><ul><li>Among the models not using BERT or BERT variants, GAIN-GloVe consistently outperforms all sequential-based and graph-based strong baselines by 0.9\u223C12.82 F1 score on the test set.</li><li>Among the models using BERT or BERT variants, GAIN-BERT base yields a great improvement of F1/Ign F1 on dev and test set by 2.22/6.71 and 2.19/2.03, respectively, in comparison with the strong baseline LSR-BERT base. GAIN-BERT large also improves 2.85/2.63 F1/Ign F1 on test set compared with previous state-of-the-art method, CorefRoBERTaRElarge.</li><li>GAIN can better utilize powerful BERT representation. LSR-BERT base improves F1 by 3.83 and 4.87 on dev and test set with GloVe embedding replaced with BERTbase while our GAIN-BERT base yields an improvement by 5.93 and 6.16.</li></ul><h3 id="ablation-study" tabindex="-1"><a class="header-anchor" href="#ablation-study" aria-hidden="true">#</a> Ablation Study</h3><p>We conduct ablation study by removing the mention-level graph, entity-level graph inference module, and the document node in the mention-level graph. The F1 scores on test set significantly decrease by 2.02~2.34/1.61~1.90 for GAIN-Glove/GAIN-BERT.</p><p><img src="'+u+'" alt="image6"></p><h3 id="further-analysis" tabindex="-1"><a class="header-anchor" href="#further-analysis" aria-hidden="true">#</a> Further Analysis</h3><h4 id="cross-sentence-relation-extraction" tabindex="-1"><a class="header-anchor" href="#cross-sentence-relation-extraction" aria-hidden="true">#</a> Cross-sentence Relation Extraction</h4><p>We evaluate GAIN on relations within a single sentence (Intra-F1) and those involving multiple sentences (Inter-F1), respectively. GAIN outperforms other baselines not only in Intra-F1 but also Inter-F1. The removal of Mention-level Graph (hMG) leads to a more considerable decrease in Inter-F1 than Intra-F1, which indicates our hMG do help interactions among mentions, especially those distributed in different sentences with long-distance dependency.</p><div align="center"><img src="'+f+'"></div><h4 id="logical-reasoning-for-relation-extraction" tabindex="-1"><a class="header-anchor" href="#logical-reasoning-for-relation-extraction" aria-hidden="true">#</a> Logical Reasoning for Relation Extraction</h4><p>We evaluate GAIN on relations requiring logical reasoning (Infer-F1), and the experimental results show GAIN can better handle relational inference. For example, GAIN-BERT base improves 5.11 Infer-F1 compared with RoBERTa-RE base. The inference module also plays an important role in capturing potential inference chains between entities, without which GAIN-BERT base would drop by 1.78 Infer-F1.</p><div align="center"><img src="'+b+'"></div><h3 id="case-study" tabindex="-1"><a class="header-anchor" href="#case-study" aria-hidden="true">#</a> Case Study</h3><p>The figure above shows the case study of our proposed model GAIN, in comparison with other baselines. As is shown, BiLSTM can only identify two relations within the first sentence. Both BERT-RE base and GAIN-BERT base can successfully predict <strong>Without Me</strong> is part of <strong>The Eminem Show</strong>. But only GAIN-BERT base is able to deduce the performer and publication date of <strong>Without Me</strong> are the same as those of <strong>The Eminem Show</strong>, namely <strong>Eminem</strong> and <strong>May 26, 2002</strong>, where it requires logical inference across sentences.</p><p><img src="'+y+'" alt="image9"></p><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><p>Extracting inter-sentence relations and conducting relational reasoning are challenging in document-level relation extraction. In this paper, we introduce Graph Aggregationand-Inference Network (GAIN) to better cope with document-level relation extraction, which features double graphs in different granularity. GAIN utilizes a heterogeneous Mention-level Graph to model the interaction among different mentions across the document and capture document-aware features. It also uses an Entity-level Graph with a proposed path reasoning mechanism to infer relations more explicitly. Experimental results on the large-scale human annotated dataset, DocRED, show GAIN outperforms previous methods, especially in inter-sentence and inferential relations scenarios. The ablation study also confirms the effectiveness of different modules in our model.</p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2><ul><li>Shuang Zeng, Runxin Xu, Baobao Chang, Lei Li. Double Graph Based Reasoning for Document-level Relation Extraction. EMNLP 2020.</li><li>Yuan Yao, Deming Ye, Peng Li, Xu Han, Yankai Lin, Zhenghao Liu, Zhiyuan Liu, Lixin Huang, Jie Zhou, Maosong Sun. 2019. DocRED: A Large-Scale Document-Level Relation Extraction Dataset. In Proceedings of ACL.</li></ul>',41);function A(B,M){const t=c("ExternalLinkIcon");return i(),r("div",null,[w,s(" more "),E,e("p",null,[T,e("a",R,[x,o(t)]),I,e("a",_,[G,o(t)])]),N])}const C=a(v,[["render",A],["__file","index.html.vue"]]);export{C as default};
