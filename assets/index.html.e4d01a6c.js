const e=JSON.parse('{"key":"v-5ef099df","path":"/mt/VOLT/","title":"Learning Optimal Vocabularies for Machine Translation in 30 Minutes","lang":"en-US","frontmatter":{"title":"Learning Optimal Vocabularies for Machine Translation in 30 Minutes","author":"Ahmed Elkordy","date":"2022-05-17T00:00:00.000Z","category":["MT"],"tag":["Multilingual MT","Vocabulary Learning","Optimal Transport"],"star":true,"summary":"Constructing a vocabulary is a fisrt step for any NLP tasks.\\nHow can we efficiently learn an optimal vocabulary for machine translation?\\nIn this blog, I will explain the VOLT algorithm from the paper Vocabulary Leaning via Optimal Transport for Neural Machine Translation, which was awarded the best paper at ACL 2021.\\nReading time: About 8 minutes\\n","head":[["meta",{"property":"og:url","content":"https://lileicc.github.io/blog/mt/VOLT/"}],["meta",{"property":"og:site_name","content":"MLNLP Blog"}],["meta",{"property":"og:title","content":"Learning Optimal Vocabularies for Machine Translation in 30 Minutes"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://lileicc.github.io/blog/"}],["meta",{"property":"og:updated_time","content":"2022-09-13T03:45:15.000Z"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Learning Optimal Vocabularies for Machine Translation in 30 Minutes"}],["meta",{"property":"article:author","content":"Ahmed Elkordy"}],["meta",{"property":"article:tag","content":"Multilingual MT"}],["meta",{"property":"article:tag","content":"Vocabulary Learning"}],["meta",{"property":"article:tag","content":"Optimal Transport"}],["meta",{"property":"article:published_time","content":"2022-05-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-09-13T03:45:15.000Z"}]]},"excerpt":"<p>Constructing a vocabulary is a fisrt step for any NLP tasks.\\nHow can we efficiently learn an optimal vocabulary for machine translation?\\nIn this blog, I will explain the VOLT algorithm from the paper <em>Vocabulary Leaning via Optimal Transport for Neural Machine Translation</em>, which was awarded the best paper at ACL 2021.</p>\\n<p>Reading time: About 8 minutes</p>\\n","headers":[{"level":2,"title":"Introduction","slug":"introduction","link":"#introduction","children":[]},{"level":2,"title":"Issues with current tokenization models","slug":"issues-with-current-tokenization-models","link":"#issues-with-current-tokenization-models","children":[]},{"level":2,"title":"Techniques of VOLT","slug":"techniques-of-volt","link":"#techniques-of-volt","children":[]},{"level":2,"title":"Effectiveness of VOLT","slug":"effectiveness-of-volt","link":"#effectiveness-of-volt","children":[{"level":3,"title":"1.\\tOverall better performance than widely used vocabularies","slug":"_1-overall-better-performance-than-widely-used-vocabularies","link":"#_1-overall-better-performance-than-widely-used-vocabularies","children":[]},{"level":3,"title":"2. Low Resource Consumption","slug":"_2-low-resource-consumption","link":"#_2-low-resource-consumption","children":[]},{"level":3,"title":"3.\\tVersatile, better on a large array of languages","slug":"_3-versatile-better-on-a-large-array-of-languages","link":"#_3-versatile-better-on-a-large-array-of-languages","children":[]}]},{"level":2,"title":"Summary","slug":"summary","link":"#summary","children":[]},{"level":2,"title":"References","slug":"references","link":"#references","children":[]}],"git":{"createdTime":1663040715000,"updatedTime":1663040715000,"contributors":[{"name":"Lei Li","email":"lileicc@gmail.com","commits":1}]},"readingTime":{"minutes":8.78,"words":2633},"filePathRelative":"mt/VOLT/README.md","localizedDate":"May 17, 2022"}');export{e as data};
