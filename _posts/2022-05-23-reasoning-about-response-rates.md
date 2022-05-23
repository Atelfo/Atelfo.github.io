---
layout: post
title: "Reasoning about response rates"
---

# Reasoning about response rates

### Introduction 
The stories of [epacadostat](https://www.biopharmadive.com/news/incyte-cancer-study-fails-setting-back-drug-combo-hopes/520781/) and [bempegaldesleukin](https://www.biopharmadive.com/news/bristol-myers-nektar-immunotherapy-trial-failure/620322/) are well-known, and nearly identical. Both were promising new immunomodulatory drugs for advanced melanoma with sensible mechanistic rationales, both were trialed in combination with an anti-PD-1, and both posted promising response rate numbers in small single-arm phase II's only to ultimately fail to beat anti-PD-1 monotherapy in larger randomized controlled phase III's. 

The PD-(L)1 class of immunotherapies have been extraordinarily successful at treating a wide range of cancers, and as the examples above illustrate, have proven challenging to improve upon when combined with other immunotherapy agents (chemotherapy or kinase inhibitor combinations aside). Just a few weeks ago there was yet another high-profile setback as tiragolumab in combination with the anti-PD-L1 atezolizumab [failed to improve outcomes in non-small cell lung cancer at an interim assessment](https://www.biopharmadive.com/news/roche-tiragolumab-tigit-lung-cancer-trial/623542/), although I should note that there is still hope that the final results will be positive for overall survival.

It's not as though dual immunotherapy combinations don't work, there have been successes: nivolumab + ipilimumab is the archetypical example, and nivolumab + relatlimab a recent successor, both approved in advanced melanoma. One of the common criticisms the failed combinations have attracted is that they were taken into pivotal trials with scant evidence of single-agent activity and hence the failures were unsurprising, although I should note that tiragolumab + atezolizumab had [positive randomized phase II data](https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(22)00226-1/fulltext) and the relatlimab combination seems to work despite LAG3 antibodies having little single-agent activity[^42].

This all serves to highlight the challenges associated with evaluating whether a combination is really better than the monotherapy alone based on data from early trials. But I do think the techniques of probability and causal inference can help to make informed judgments about response rate data in single-arm phase II oncology combination trials, which is what I want to explore in this post. 

### The overall response rate (ORR)
The overall (or objective) response rate (ORR) is usually the primary way in which the efficacy of a new oncology drug is judged in early stage clinical trials. The standard definition of ORR is the proportion of patients with a complete or partial response to therapy, which are defined [per the RECIST 1.1 guidelines for solid tumours](https://recist.eortc.org/recist-1-1-2/) as:

- Complete Response (CR): *"Disappearance of all target lesions. Any pathological lymph nodes (whether target or non-target) must have reduction in short axis to <10 mm"*
- Partial Response (PR): *"At least a 30% decrease in the sum of diameters of target lesions, taking as reference the baseline sum diameters"*

Response criteria are somewhat different for liquid tumours and for [immunotherapies](https://recist.eortc.org/irecist/) vs. chemotherapeutic agents, but I'll ignore that complication for now as it's not strictly relevant for this post.

ORR is a surrogate for the more important outcomes of overall survival and quality of life, however, as it can be relatively quickly assessed it's commonly used as the primary endpoint for the short, small, and comparatively inexpensive phase I/II trials which are run in order to provide justification for funding larger and longer phase III's with survival-based endpoints. Generally, a 20% ORR for single agents[^40] or a 20% relative improvement in ORR on top of standard of care (i.e., in combination) is the minimal proof of concept threshold that a drug should hit in phase II to justify advancement to phase III.

It's a common scenario for companies to run a small single-arm phase II trial, tout an ORR value that appears superficially impressive when compared to a standard of care benchmark, then fail in phase III when it turns out that the promising early efficacy didn't hold up in larger trials. Sometimes these failures can be explained by ORR being an imperfect surrogate endpoint with a weak or absent correlation with overall survival[^5][^6][^7]. However, in other cases the most parsimonious explanation is simply mean reversion as sample sizes increase.

Novel combination trials are particularly prone to encountering the issue of false positives in small trials. When a single agent drug is being tested in isolation in a single-arm phase II trial any responses are very likely to indicate true efficacy because there is no confounding with other known active agents and cancers rarely spontaneously regress[^41]. However, in combination trials it can be hard if not impossible to disentangle the efficacy of the new drug from a combination partner with known activity in that setting; there is a fundamental credit assignment challenge in regards to attributing a response to the established drug, the new drug, or "synergistic interactions" (the latter of which [may not even exist](https://pubmed.ncbi.nlm.nih.gov/35045958/)).

Through this post I'm going to think about ways to assess ORRs in early trials, focusing on metastatic melanoma (the "proving ground" for new immunotherapy agents) and the case of epacadostat, one of the early and highest profile immunotherapy combination failures. For background (and as I'll be referencing these values throughout the post), I've compiled a (non-exhaustive) selection of ORR data from key trials of immunotherapy drugs in first-line advanced melanoma in the table below. There are some complexities with different criteria for ORRs which can confound inter-trial comparisons, but I'll ignore that because it's convenient to do so.

Regimen | ORR | Trial | Phase | Trial start year
--- | --- | --- | --- | ---
Ipilimumab + dacarbazine | 17% (42/250) | NCT00324155[^21] | III | 2006
Ipilimumab | 17% (31/181) | KEYNOTE-006[^19] | III | 2013
Ipilimumab | 19% (60/315) | CheckMate 067[^18] | III | 2013
Ipilimumab + epacadostat |  23% (9/39) | NCT01604889[^16] | II | 2012
Nivolumab | 33% (117/359) | RELATIVITY-047[^20] | III | 2018
Pembrolizumab |  32% (111/352) | ECHO-301/KN-252[^22] | III | 2016
Pembrolizumab + epacadostat |  34% (121/354) | ECHO-301/KN-252[^22] | III | 2016
Nivolumab + relatlimab | 43%  (153/355) | RELATIVITY-047[^20] | III | 2018
Nivolumab | 44% (138/316) | CheckMate 067[^18] | III | 2013
Pembrolizumab | 46% (170/368) | KEYNOTE-006[^19] | III | 2013
Nivolumab + bempegaldesleukin |  53% (20/38) | PIVOT-02[^14] | II | 2016
Pembrolizumab + epacadostat |  56% (25/45) | ECHO-202[^17] | II | 2014
Nivolumab + ipilimumab | 58% (181/314) | CheckMate 067[^18] | III | 2013 
Nivolumab + epacadostat |  65% (26/40)| ECHO-204[^15] | II | 2014
Pembrolizumab + lifileucel | 67% (6/9) | NCT03645928[^23] | II | 2019


### ORR as a binomially distributed variable
Because ORR is a binary outcome - either a patient achieves a PR or CR, or they do not - we can use the [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) to evaluate the distribution of ORR outcomes. Therefore, the probability of a given drug achieving a particular response rate in a trial is given by:

$$P(ORR) = \binom{s}{r}p^{r}(1-p)^{s-r}$$

Where p is the probability of a PR or CR (i.e. the ORR), s is the sample size and r is the number of responses. An important assumption I make here is that all drugs have a "true" invariant response rate for a particular population (henceforth referred to as the tORR), and the distribution of results in a given trial are randomly determined by this underlying probability (so p = tORR in the above formula). To calculate the chance of a drug achieving an ORR equivalent or better than a specific value we need to sum the results for every equal or greater value of r up to and including the value at which r = s (i.e., everyone in the trial responds).

Using the binomial distribution is a helpful starting point for analyzing single-arm trials because it allows us to quantify how likely a particular result is at specific assumptions of tORR. For example, I've plotted results from a number of example trials below (all melanoma except for magrolimab, which is in myelodysplastic syndrome). Each line shows the probability of achieving the result in the legend if the tORR was the value shown on the x-axis - naturally the most likely result is the one that was actually achieved.

{% include trial_distribs.html height='100%' width='800px' %}

The most important thing to notice from the chart is how as the sample size increases, the spread of likely values also increases; a drug with a tORR of 60% could quite plausibly achieve an ORR of 80% in a small trial of 9 patients, whereas the results of a large 300+ person trial are almost never going to deviate much from the tORR.

Returning to the epacadostat + pembrolizumab example, we can use the formula above to estimate how likely the result in ECHO-202 was, if we assume that the epacadostat combo is no better than pembrolizumab mono (as we now know to be the case from the results of ECHO-301). 

To do this we need to select a tORR benchmark that represents the activity of pembrolizumab alone. Cross-trial comparisons are always fraught, but you are forced to do it when evaluating single-arm studies. We can use the 46% ORR from KEYNOTE-006 as our reference point, although it's notable that pembrolizumab underperformed this benchmark in ECHO-301 (32% ORR), possibly due to selection bias in more recent trials.

Plugging the sample size and response rate data from ECHO-202 along with the 46% benchmark into the binomial formula gives us the probability that pembrolizumab plus an ineffective agent would achieve the exact result seen in ECHO-202.

$$P(ORR) = \binom{45}{25}0.46^{25}(1-0.46)^{45-42} = 5.22\%$$

However that just tells us the probability for a specific outcome, what is more meaningful is the chance of the epacadostat combo achieving at least a certain ORR or better, assuming it did not improve at all on pembrolizumab monotherapy. I've plotted the results of this below:

{% include ORR_chance_graph.html %}

So there is a ~13% chance that the epacadostat would achieve an ORR of 56% or better if it was no better than pembrolizumab mono. Which may seem low, but to properly assess this result we need to incorporate the additional context of high failure rates in oncology, as this makes false positives a significant risk.

### Oncology and the false discovery rate
While we can use the binomial distribution to calculate how likely a drug is to meet or exceed an ORR threshold given that it is inactive, the inverse is probably the more interesting question: Given that a drug has succeeded in a trial, how likely is it to be inactive? Before addressing this question explicitly, I want to first discuss false positives in oncology in general terms. 

Oncology is the therapy area with the most drug development activity, and yet it has one of the lowest probabilities of success. Only ~11% of phase II oncology drugs make it all the way to approval[^3], with a lack of efficacy being the most frequent reason for failure (accounting for ~64-82% of failures by some estimates[^9][^13]). The numbers are only slightly more encouraging for immuno-oncology drugs, which have a ~19% likelihood of approval from phase II[^3].

This low prior probability of activity influences how we should interpret positive results for a given trial. If we just take the probability of a drug or combination achieving a particular result at face value we won't properly account for the risk of [false discoveries](https://en.wikipedia.org/wiki/False_discovery_rate), which are likely given the high failure rates of oncology drugs. With 8,681 recruiting or active studies for "cancer" drugs in phase II on clinicaltrials.gov[^8] we should expect many false positives in the near future.

To illustrate the false discovery rate problem I've set up the following hypothetical scenario:

Imagine that you're testing a promising new drug for first-line metastatic melanoma in combination with pembrolizumab in a single arm phase II. Let's say you're looking for a minimum response rate of ~57% to justify advancing the program to a randomized controlled phase III trial (a 20% decrease in the rate of non-responses versus the monotherapy benchmark of 46%).

$$46\% + 20\% \cdot (1-46\%) = 56.8\%$$

How many false positives can you expect? And at which sample size is a positive trial more likely to be a true positive than a false positive?

For each sample size in the range of 1 to 100 I simulated 1000 drug-trial pairs where each drug had a 19% chance of being effective (i.e., with a tORR >= 57% efficacy threshold). If the combination was more effective than the monotherapy the tORR was randomly generated by a uniform distribution to be between 57% and 100%. If the drug was ineffective, the combination took the pembrolizumab monotherapy tORR, assumed to be 46%. The actual results were randomly sampled from a binomial distribution. Below the results of the simulation are plotted.

{% include FDRplot.html %}

Two conclusions are clear from the simulation for the parameters I chose:
- A higher proportion of small trials meet the efficacy bar; larger trials will fail more often
- Most positive trials with less than ~20 patients are false discoveries

In this hypothetical scenario with a typical phase II trial size of 40-60 patients, we'd expect a 20-30% chance of our combination being a false positive and therefore failing in the pivotal trial (at significant expense). 

To generalize from this specific case, high false discovery rates in phase II contribute directly to high phase III failure rates in oncology; historical data indicates that only ~44% of phase III oncology drugs get approval (48% for immuno-oncology)[^3]. In order to reduce the risk of false discoveries one could increase the efficacy threshold for advancement to phase III, increase the sample size[^10] or select an indication or drug class with a high baseline probability of success.

### Bayesian inference 
We now return to the question I asked at the beginning of the last section: Given that a drug has succeeded in a trial, how likely is it to be inactive?

We can combine the pieces of information we've discussed - the probability of achieving a specific ORR, and the false discovery rates - by making use of [Bayes' theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem) (shown below), which incorporates prior information to give us insight into the likely meaningfulness of a given result.

$$P(E|ORR) = \frac{P(ORR \vert E) \cdot P(E)}{P(ORR)}$$

Where E is the probability that the drug is effective and ORR is the probability of reaching the threshold ORR in the trial. We'll work through example calculations for the epacadostat + pembrolizumab combination:

For the baseline probability of efficacy P(E) we can use the 19% chance of approval for a phase II IO drug[^3] (arguably this should be a bit higher because not all trials fail due to lack of efficacy, but 19% seems a reasonable guess). You could also input your subjective prior belief that the combination is efficacious (expressed in percentages).

$$P(E \vert ORR) = \frac{P(ORR \vert E) \cdot 0.19}{P(ORR)}$$

P(ORR\|E) is the probability that a drug meets the ORR threshold, given that it is effective. This is hard to work out exactly from first principles, but I'm going to use a conservative lower bound by assuming that the tORR is the same as what the combination achieved in the phase II (56%), if we assume that the combination needs at least this value to succeed in the trial P(ORR\|E) also ends up at ~56%.

$$P(E|ORR) = \frac{0.56 \cdot 0.19}{P(ORR)}$$

Lastly, we need to find the probability of a reference class of combinations posting an ORR greater than the threshold. When you have a lot of data you can use the empirical distribution, but there is not enough data in melanoma to do that confidently. So we can just try to logically estimate it by decomposing the problem in the following way:

$$P(ORR) = P(E) \cdot P(ORR \vert E) + P(\neg{E}) \cdot P(ORR|\neg{E})$$

We know $$P(ORR \vert \neg{E}) = 13\%$$ from our estimations in an earlier section. And we just estimated P(ORR\|E) above. Then we just need to weight the contributions:

$$P(ORR) = 0.19 \cdot 0.56 + 0.81 \cdot 0.13 = 0.2117$$

So putting it all together:

$$P(E \vert ORR) = \frac{0.91 \cdot 0.19}{0.2117}$$

$$P(E \vert ORR) = 50.3\%$$

Incorporating the prior likelihood of failure led to a rough estimate of a ~50% chance that epacadostat + pembrolizumab was better than pembrolizumab monotherapy based on the results of KEYNOTE-006 and ECHO-202. That's a fairly large discount to the 87% given by the binomial probability alone, and seems like a fair assessment of the chances with what was known at the time.

### Building on Bayes: maximum likelihood estimation (MLE)
To finish I'd like to do one better and work out what is the most likely ORR for a drug given its performance in a trial, and for that we can make use of a technique called Bayesian [maximum likelihood estimation (MLE)](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation#Relation_to_Bayesian_inference) which is a fancy term for enumerating the probability of each individual hypothesis being true, given the observed data - all calculated using Bayes' formula. Our hypothesis in this case may be that a combination could take on any tORR value from 0 to 100%, so by calculating the probability of tORR separately, we can find the tORR with the highest probability given the evidence. So in this case, we will run the below calculation multiple times until we find the one that gives us the highest probability:

$$P(tORR \vert eORR) \propto P(eORR \vert tORR) \cdot P(tORR)$$

In this case eORR refers to the experimental ORR, which is the evidence for a specific hypothesized value of tORR. So using the formula above we can determine what value of tORR best fits the evidence from existing trials (eORR). The nice thing about this technique is that we [don't need the denominator of Bayes' formula to find the most likely value](https://en.wikipedia.org/wiki/Bayesian_inference#Bayesian_inference), because it's just a normalization term and so doesn't change where the peak probability is found.

The main practical difference between MLE and the simple example of Bayes' formula in the last section is that we need a distribution of probabilities as input, not just singular values. For P(eORR\|tORR) this is relatively straightforward to calculate, as we can use the binomial distribution to tell us how likely the value of eORR that was achieved in prior trials for each value of tORR. However, calculating P(tORR) (the prior) can be challenging and is probably unknowable in any precise sense, but the distribution of outcomes of large phase III's should be close to the real value. 

Let's return to the epacadostat + pembrolizumab example a final time and try to estimate the tORR of the combination, given its performance in ECHO-202. For the distribution of P(eORR\|tORR) I can simply use the binomial probability of achieving 25 out of 45 responses at each value of tORR (the same as the distribution in the first graph).

Next, the distribution of P(tORR). Unfortunately the small number of relevant phase III's and the ever-shifting landscape of therapy means there's not really enough data to build a robust distribution of tORR values to use as a prior, so I'll substitute it with a more theoretical distribution. Per BIO data, ~48% of phase III immuno-oncology drugs make it to approval[^3]. Additionally, given standard powering assumptions, drugs need to be ~20% better relatively to succeed vs comparators - which is 56.8% ORR against the pembrolizumab monotherapy benchmark of 46%, per calculation above. So I'll simply assume an exponential distribution where 48% of samples are above 10.8% ORR, which you can calculate from the cumulative distribution function as below:

$$1 - e^{-\lambda x}$$

$$1 - e^{-\lambda 0.108} = (1 - 0.48)$$

$$\ln(1) - -0.108 \lambda  \ln(e) = \ln(0.52)$$

$$\lambda = ~6.055$$

Then I'll shift the distribution so that it starts with 46% tORR as the most probable value (the pembrolizumab distribution), assuming that epacadostat can't make pembrolizumab less effective. If this was actually an analysis for serious decision making you'd want to use a more robust prior, but this rough prior seems reasonable enough to illustrate the point. 

If we run and plot the MLE calculation, we get the following result:

{% include MLEplot.html %}

Because the uncertainty from epacadostat's phase II is relatively high and I used a prior with a sharp peak at 46% (i.e., ineffective), we see the posterior distribution pulled strongly towards the prior, such that the most likely estimated ORR for epacadostat is only marginally above pembrolizumab monotherapy at ~49%, which would not be enough for a clinically meaningful difference.

And so we finish our brief tour of inferential techniques for the evaluation of early-stage combination ORRs in oncology. While false positives are likely to be common in small single-arm oncology clinical trials combining active drugs with novel agents with unclear or unknown efficacy, I hope I've shown how the techniques of Bayesian inference can help make inferences about these datasets regardless. 

[^1]: [https://www.annualreviews.org/doi/abs/10.1146/annurev-cancerbio-030419-033635](https://www.annualreviews.org/doi/abs/10.1146/annurev-cancerbio-030419-033635)
[^3]: [https://go.bio.org/rs/490-EHZ-999/images/ClinicalDevelopmentSuccessRates2011_2020.pdf](https://go.bio.org/rs/490-EHZ-999/images/ClinicalDevelopmentSuccessRates2011_2020.pdf)
[^4]: [https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7327371/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7327371/)
[^5]: [https://pubmed.ncbi.nlm.nih.gov/35183043/](https://pubmed.ncbi.nlm.nih.gov/35183043/)
[^6]: [https://pubmed.ncbi.nlm.nih.gov/25667291/](https://pubmed.ncbi.nlm.nih.gov/25667291/)
[^7]: [https://pubmed.ncbi.nlm.nih.gov/33338851/](https://pubmed.ncbi.nlm.nih.gov/33338851/)
[^8]: Number accurate as of the 15th of May 2022, accessed [here](https://clinicaltrials.gov/ct2/results?cond=cancer&recrs=a&recrs=d&age_v=&gndr=&type=&rslt=&phase=1&Search=Apply)
[^9]: [https://pubmed.ncbi.nlm.nih.gov/27723879/](https://pubmed.ncbi.nlm.nih.gov/27723879/)
[^10]: It seems like it could be an interesting exercise to apply principles of information theory to trial sample size selection. Thinking of a trial as an information channel where false positives or negatives are noise, and adding sample reduces noise but adds cost. Which sample size maximizes efficiency (signal per unit cost)?
[^13]: [https://pubmed.ncbi.nlm.nih.gov/27883925/](https://pubmed.ncbi.nlm.nih.gov/27883925/)
[^14]: [https://ascopubs.org/doi/full/10.1200/JCO.21.00675](https://ascopubs.org/doi/full/10.1200/JCO.21.00675)
[^15]: [https://ascopubs.org/doi/abs/10.1200/JCO.2018.36.15_suppl.9511](https://ascopubs.org/doi/abs/10.1200/JCO.2018.36.15_suppl.9511)
[^16]: [https://pubmed.ncbi.nlm.nih.gov/30894212/](https://pubmed.ncbi.nlm.nih.gov/30894212/)
[^17]: [https://www.annalsofoncology.org/article/S0923-7534(20)38477-5/fulltext](https://www.annalsofoncology.org/article/S0923-7534(20)38477-5/fulltext)
[^18]: [https://clinicaltrials.gov/ct2/show/results/NCT01844505](https://clinicaltrials.gov/ct2/show/results/NCT01844505)
[^19]: [https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(19)30388-2/fulltext](https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(19)30388-2/fulltext)
[^20]: [https://ascopubs.org/doi/abs/10.1200/JCO.2022.40.36_suppl.360385?af=R](https://ascopubs.org/doi/abs/10.1200/JCO.2022.40.36_suppl.360385?af=R)
[^21]: [https://clinicaltrials.gov/ct2/show/results/NCT00324155](https://clinicaltrials.gov/ct2/show/results/NCT00324155)
[^22]: [https://clinicaltrials.gov/ct2/show/results/NCT02752074](https://clinicaltrials.gov/ct2/show/results/NCT02752074)
[^23]: [https://www.iovance.com/wp-content/uploads/Iovance_SITC-2021_Phase-2-Efficacy-and-Safety-of-Autologous-Tumor-Infiltrating-Lymphocyte-TIL-Cell-Therapy-in-Combination-with-Pembrolizumab-in-Immune-Checkpoint-Inhibitor-Na%C3%AFve-Patients-with-Advanced-Cancers.pdf](https://www.iovance.com/wp-content/uploads/Iovance_SITC-2021_Phase-2-Efficacy-and-Safety-of-Autologous-Tumor-Infiltrating-Lymphocyte-TIL-Cell-Therapy-in-Combination-with-Pembrolizumab-in-Immune-Checkpoint-Inhibitor-Na%C3%AFve-Patients-with-Advanced-Cancers.pdf)
[^40]: [https://pubmed.ncbi.nlm.nih.gov/2702835/](https://pubmed.ncbi.nlm.nih.gov/2702835/)
[^41]: [https://pubmed.ncbi.nlm.nih.gov/9134002/](https://pubmed.ncbi.nlm.nih.gov/9134002/)
[^42]: [https://www.nature.com/articles/d41573-022-00036-y](https://www.nature.com/articles/d41573-022-00036-y)