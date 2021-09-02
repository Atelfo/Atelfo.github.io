# Drug Vectors: identifying and plotting similar drugs through PubMed abstract text
#### t-SNE plot of approved drugs clusted by similarity, coloured by 1st level ATC code

[![](https://atmusingblog.files.wordpress.com/2020/08/image.png?w=1024)](https://chart-studio.plotly.com/~atelfo/8/#/)

_On the t-SNE plot above, **each dot is an individual drug** coloured by its [1st level (i.e. anatomical main group) ATC code](https://www.whocc.no/atc/structure_and_principles/) (extracted from DrugBank, light grey means the ATC code was missing from the database) which provides an indication of the bodily system that the drug acts upon. The coordinates of each drug are a 2-dimensional representation of the words used in the PubMed corpus of titles and abstracts of papers that mention each drug (see bottom of the post for code and details on methodology), **similar drugs should be located close together on the plot**. Unfortunately, Obsidian does not support plot.ly embedding, but clicking on the image will open the interactive version of the visual. If you hover over each dot you should see the drug name and a brief description (the first sentence of the description extracted from DrugBank)_

### How could the similarity between drugs be defined and quantified?

**In a commercial pharma/biotech context, "drug analogues" often refers to a set of drug products that are qualitatively similar enough to a given product to act as historical examples that are informative for forecasting purposes**. The intuition being that drugs that are similar in relevant ways that can be readily identified (e.g. similar route of administration, used to treat similar conditions, similar position in the treatment algorithm and so on) are likely to be similar in other ways that are of interest but cannot be directly measured or must be forecasted, such as future price or future revenue. **This definition contrasts with the definition from chemistry in which "analogues" refer to drugs that are similar either structurally, functionally or in both respects**.

Beyond the simple business use described above. Analogue identification also has the potential to inform R&D activities, including **drug repurposing**, as described in a recent Nature Drug discovery paper by Pushpakom, et. al.

> _"Drug–drug similarity approaches aim to identify shared mechanisms of action of otherwise dissimilar drugs (drugs that belong to different classes or that are structurally dissimilar). This principle is called guilt by association and can aid the identification of alternative targets of existing drugs and uncover potential off‑target effects that can be investigated for clinical applications"_
> 
> https://www.nature.com/articles/nrd.2018.168

Drug analogue identification for commercial pharma/biotech projects is typically a subjective exercise where a holistic judgement is made as to whether or not the factors that are similar outweigh the factors that are different. Actual predictive value of analogues as a forecasting tool notwithstanding, analogue identification in itself presents an interesting optimization problem. It's not obvious which features of a drug will produce the most useful analogues for a given task, nor is it obvious what the relative importance of these features are. A given pair of drugs could be considered analogues under one set of criteria and not under another. With that context in mind **I was interested in exploring general methods to evaluate drug-drug similarity without defining the analogue criteria upfront**, and to do that I took inspiration from a methodology used in natural language processing - [word embeddings](https://en.wikipedia.org/wiki/Word_embedding).

Word embeddings are a method of representing word meaning as a series of numerical values. The central insight being that words with similar meanings tend to be used in similar contexts (i.e. they co-occur with similar sets of words). Critically, embedding distils a complex concept like "meaning" to numerical values so that it can be used as an input to machine learning algorithms.

Similar to how _"a word is characterized by the company it keeps"_ (Firth, 1957), it's straightforward to extend this principle to drugs - in the sense that **a drug is characterised by the words that are used in papers that are published about it**. For example, papers about the various penicillin derivatives (incl. ampicillin, amoxicillin, etc.) are more likely to mention terms specific to their structure or function like "β-lactam" or "antibiotic" than a randomly selected paper, and conversely, papers that mention these terms are more likely to be about penicillin derivatives than papers that don't contain them.

In the process detailed at the end of this post, I set out to create embeddings for approved drugs using text from PubMed abstracts and titles of papers that mention those drugs. I then used dimensionality reduction techniques to create and plot the visual representation of drug-drug similarity at the beginning of this post.

I expected to see clusters of colour emerge in the t-SNE plot (i.e. clusters of similar ATC codes), and that's broadly what is seen with some interesting exceptions. Often the rationale for the clusters are easily understood as related to a specific disease and/or mechanism of action, such as the red anti-arrhythmics grouping on the far right. Others are more interesting, such as the grouping near the coordinates (-64, -38) which appears to correspond to a protein folding stabilizer/splicing modulator group of drugs such as ivacaftor, nusinersen and tafamidis which treat very different diseases. The large kaleidoscopic cluster in the upper right includes a variety of natural products (incl. carbohydrates, vitamins and minerals).

While I'm pleased with the first iteration of the analysis and visualization as a proof of principle, there is still room for improvement. The disordered cloud in the middle-bottom lacks clear logic for many of the groupings, if you look closely there are substructures with logic, such as the topical corticosteroid cluster at (-17, -38) there are many other drugs that don't seem as though they should occupy the same neighbourhood - this could be a result of the model picking out spurious patterns in noisy data or some latent logic that's not readily apparent.

Although there is much that could be improved, the analysis was fundamentally effective at identifying similar drugs and with further investigation and refinement could be a useful methodology to quantify drug similarity and identify analogues for a variety of purposes.

### Detailed analysis methodology and code

1.  **Download list of approved drugs from DrugBank ([available here](https://www.drugbank.ca/releases/latest#full))**
-   DrugBank is a rich database of pharmaceutical products that allows anyone to download its database for non-commercial use for free
-   There's a lot of potentially useful information associated with each drug in the database, but for this oarticular project I only made use of the names of approved drugs, ATC codes and the first line of the description
-   In the end, this resulted in a list with just over 2,500 drugs

```py
import xml.etree.ElementTree as ET
import pandas as pd

tree = ET.parse('DrugBank database filepath')

root = tree.getroot()

#make a dictionary that contains all approved drugs and the relevant database values
approved_drugs = {}

def getATC(drug):
    try:
        return([i.text for i in drug.find('{http://www.drugbank.ca}atc-codes').find('{http://www.drugbank.ca}atc-code').getchildren()])
    except:
        return('Unknown')
        
for drug in root:
    #only include drugs in the dictionary if they are listed as approved in DrugBank
    if drug.find('{http://www.drugbank.ca}groups').findtext('{http://www.drugbank.ca}group') == 'approved':
        approved_drugs[drug.findtext('{http://www.drugbank.ca}name')] = {
                'Description': drug.findtext('{http://www.drugbank.ca}description'),
                'ATC codes': getATC(drug)}

alldrugs = pd.DataFrame(approved_drugs).T
druglist = list(alldrugs.index)
```

2.  **Download abstracts from PubMed ([available here](https://www.nlm.nih.gov/databases/download/pubmed_medline.html))**
-   PubMed allows information about all the papers on the site to be freely downloaded, including abstracts but excluding full text
-   After downloading the PubMed data, I looped through all the papers and tagged them with drug names if the name of that drug appeared in the title or abstract of the paper

```py
drugpapers = {}

for file in PubMed_file_directory:
    #parse XML from every pubmed DL file
    tree = ET.parse(file).getroot()
    
#extract papers referencing drugs from every pubmed file
for paper in tree:
	try:
		AbstractInfo = {'Title': paper.find('MedlineCitation').find('Article').findtext('ArticleTitle'),
						'Abstract': paper.find('MedlineCitation').find('Article').find('Abstract').findtext('AbstractText')}
		AbstractInfo['AllText'] = AbstractInfo['Title'] + ' ' + AbstractInfo['Abstract']
		AbstractInfo['DrugTags'] = []

		#check if text contains any drugs from the druglist
		for drug in druglist:
			if drug in AbstractInfo['AllText']:
				AbstractInfo['DrugTags'].append(drug)

		#include papers with drug mentions in dictionary
		if len(AbstractInfo['DrugTags']) > 0:
			pmid = paper.find('PubmedData').find('ArticleIdList').findtext('ArticleId')
			drugpapers[pmid] = AbstractInfo
		else:
			#no drugs in papers
			pass
	except:
		#if no abstract is found
		pass

#dataframe of papers        
drugpapers = pd.DataFrame(drugpapers).T
```

3.  **Build a count matrix of all the words that appear in all the abstracts**
-   Once I had a DataFrame of all the titles and abstracts for the papers that mentioned each drug, I then used [scikit learn's CountVectorizer function](https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.CountVectorizer.html) to create word count matrices for each drug

```py
from sklearn.feature_extraction.text import CountVectorizer
    
def retrieve_drugtag_index(drug):
    #find the index of the papers in the DataFrame that mention each drug
    indices = []
    for i in range(len(drugpapers)):
        if drug in drugpapers.iloc[i, 2]:
            indices += [i]
    return(indices)

def extractWM(drug):
    #if there are 1 or more papers tagged with a drug calculate the word count vector using the words in all the tagged titles and abstracts
    drug_tag_indices = retrieve_drugtag_index(drug)
    
    if len(drug_tag_indices) > 0:
        drug_abstract_text = (' ').join(drugpapers.iloc[drug_tag_indices, :]['AllText'].values)
        
        vectorizer = CountVectorizer()
        drugWM = vectorizer.fit_transform([drug_abstract_text])
    
        drugWM_df = pd.DataFrame(drugWM.toarray(), index=[drug], columns = vectorizer.get_feature_names())
        
        return(drugWM_df)
    
    else:
        #if no abstracts for the given drug
        return('No abstracts')
    
#build drug-word matrix    
count = 0
for drug in druglist[count:]:

    drugWM_df = extractWM(drug)
    
    if type(drugWM_df) == pd.core.frame.DataFrame:
        if count == 0:
            drugwords = drugWM_df.copy()
        else:
            drugwords = pd.concat([drugword_df, drugWM_df])
        
        count += 1
    else:
        pass
```

4.  **Calculate [pointwise mutual information (PMI)](https://en.wikipedia.org/wiki/Pointwise_mutual_information)**
-   To account for differences in number of abstracts per drug and to remove the effects of common words like "the", "and", "of" etc. that aren't predictive I calculated pointwise mutual information (PMI) for the word count matrix

```py
'''
                  P(x, y)
pmi(x ,y) = log ------------ 
                  P(x)P(y)
'''

#add rows of sums for pmi calculations
drugwords['sumrows'] = drugwords.sum(axis=1)
drugwords = drugwords.append(pd.DataFrame(drugwords.sum(), columns=['drugSum']).T)

drugwords['p_word'] = drugwords['sumrows'] / drugwords.loc['drugSum', 'sumrows']

#p_drug
drugwords = drugwords.append(pd.DataFrame(drugwords.loc['drugSum', :] / drugwords.loc['drugSum', 'sumrows']).T)

drugwords.index = list(drugwords.index)[:-1] + ['p_drug']

def calc_pmi(drug):
    #make a DataFrame for a single drug
    drugseries = pd.DataFrame(drugwords[drug][:-2])
    
    #calculate the conditional probabilities using pre-calculated word/drug probabilities
    drugseries['p_word_given_drug'] = drugseries[drug] / drugwords.loc['drugSum', drug]
    
    drugseries['p_word x p_drug'] = drugwords['p_word'].copy() * drugwords.loc['p_drug', drug].copy()
    
    drugseries['PMI'] = np.log(drugseries[drugseries['p_word_given_drug'] > 0]['p_word_given_drug'] / drugseries['p_word x p_drug']).fillna(0)
    
    return(drugseries['PMI'])

#create PMI DataFrame with each drug in a separate column
pmi_drugwords = pd.DataFrame()

for drug in drugwords.columns:
    try:
        pmi_drugwords[drug] = calc_pmi(drug)
    except Exception as e:
        print(e)
```

5.  **Finally, use [principal component analysis (PCA)](https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html) reduce dimensionality and [t-distributed stochastic neighbor embedding (t-SNE)](https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html) to visualise drug similiarity**

```py
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

features = StandardScaler().fit_transform(pmi_drugwords.drop(['sumrows','p_word'], axis=1)).T

pca = PCA(n_components=80)

pca_drugwords = pca.fit_transform(features)

df_pca_drugwords = pd.DataFrame(pca_drugwords.T, columns=pmi_drugwords.columns[:-2])

#tsne
from sklearn.manifold import TSNE
tsne = TSNE(n_components=2, perplexity=20, n_iter=3000)    
        
tsne_results = tsne.fit_transform(df_pca_drugwords.T)

df_tsne_drugwords = pd.DataFrame(tsne_results, columns=['x-tsne', 'y-tsne'], index=pmi_drugwords.columns[:-2])
    
#plot tsne
import matplotlib.pyplot as plt

fig, ax = plt.subplots()

colordic = {'Unknown':'lightgray', 
             'ANTIINFECTIVES FOR SYSTEMIC USE':'lightgreen',
             'ANTINEOPLASTIC AND IMMUNOMODULATING AGENTS':'darkblue',
             'BLOOD AND BLOOD FORMING ORGANS':'darkred', 
             'NERVOUS SYSTEM':'darkorange',
             'ALIMENTARY TRACT AND METABOLISM':'sandybrown', 
             'CARDIOVASCULAR SYSTEM':'tomato',
             'MUSCULO-SKELETAL SYSTEM':'navajowhite',
             'ANTIPARASITIC PRODUCTS, INSECTICIDES AND REPELLENTS':'olive',
             'SENSORY ORGANS':'lightskyblue', 
             'GENITO URINARY SYSTEM AND SEX HORMONES':'hotpink',
             'VARIOUS':'dimgray', 
             'DERMATOLOGICALS':'goldenrod',
             'RESPIRATORY SYSTEM':'mediumseagreen',
             'SYSTEMIC HORMONAL PREPARATIONS, EXCL. SEX HORMONES AND INSULINS':'orchid'}

df_tsne_drugwords['colour'] = [colordic[alldrugs.loc[drug,'ATC category']] for drug in df_tsne_drugwords.index]

ax.scatter(df_tsne_drugwords['x-tsne'], df_tsne_drugwords['y-tsne'], color=df_tsne_drugwords['colour'])

for i in range(len(df_tsne_drugwords.index)):
    ax.annotate(df_tsne_drugwords.index[i], (df_tsne_drugwords['x-tsne'][i], df_tsne_drugwords['y-tsne']
```

_DrugBank's data is available under a [Creative Common’s Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/legalcode). PubMed's data is provided courtesy of the U.S. National Library of Medicine, the terms of use are located [here](https://www.nlm.nih.gov/databases/download/terms_and_conditions.html)_

#Pharma/Biotech #Articles