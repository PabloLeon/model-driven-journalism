# NHS Waiting time Scenarios

Why: platforms allows transparency and feedback (and as such might increase trust), but also story in bigger picture (as new stories/alternative views grow around the initial story-seed).

Choose your own adventure where adventures are selecting data from a set of options and creating predictive models (all GLMs or so). Always emphasize expressing prior assumptions and predictions first and then position yourself in the space of other stories, assumptions and (true) data.

Personas: Journalists, Data-Scientist, Public

## Scenario 1: Starting a story: Journalist

Jane sees an article on the guardian about longer waiting times for NHS treatment. She is wondering if "raising demand, widespread staff shortages and an unprecedented financial squeeze" will affect waiting times differently in the different regions and if some hospitals/regions manage better than others. She is especially interested in the possible effect that Brexit might have on the financial squeeze and what the resulting waiting times might be.

She posts the question "How successful is the NHS at delivering on referral to treatment waiting time targets for cancer" on the platform. She is asked to clarify what the waiting time targets for cancer mean, in this case 62 waiting days till treatment (she links the NHS page stating that) and how this is encoded/counted - she clarifies this as percentage of patients still waiting for treatment after 62 days. 

She then is asked which factors she thinks might affect waiting times. She fills in a list of candidate characteristics affecting waiting times and the system autosuggests linking variables to known values (datasets in the database). She ends up with a model that postulates that waiting times are affected by the number of cancer patients, spending on individual hospitals, the number of doctors and the number of nurses. Spending for healthcare does not exist on a regional level in the database, but only as an overall statistic. The model shows that number of GPs (negatively) and number of patients (positively) impacts waiting times. She annotates this prediction with a short statement on how the Brexit deal will have to make sure that the same (or more) GPs are available and links to a statement of the government about the negotiations that hint at a special arrangement for immigration for NHS staff. She sets a reminder to update the article for the next NHS data update at the end of the year.

## Scenario 2: Adding to a story: Data-Scientist

Doris sees Jane's question and the preliminary analysis. She knows that the regional providers have to list their funding in their yearly reports. She writes a script to scrape all reports for their funding and attaches the spreadsheet to Jane's original report.

## Scenario 3: Contrasting stories: Journalist

Jim sees Jane's question and the resulting document. He thins that the percentage of people not being treated in terms of the NHS targets is not the right way to approach the issue. Instead he suggests looking at how much longer than the target people are waiting. He branches off from the original question Jane posted by exploring which factors influence this measure (the average waiting times > than the government target). He writes an alternative story highlighting the large differences in waiting times.


## Scenario 4: Reading a story: Public

Before Paul reads one of the articles on waiting times linked to the general question he answers a few questions about his prior opinion. First he is explained what constitutes waiting time and what the government target is (from Jane's initial clarification). He is asked about "his" region and how he thinks it compares to the rest of England in terms of waiting times. He is then asked to rate (some/the most frequent) of the predictors chosen by stories in the database in terms of how much they contribute to the waiting time prediction. Finally he can add own factors and build his own prediction. 

Given his own and the other predictions/stories he can then navigate the map of UK waiting times and rate their plausibility. He can also dive deeper into the individual articles and read explanations and annotations written by Jane or Jim. At all times his assumptions and predictions are contrasted with the other stories. Paul thinks his region exemplifies an important aspect of potential cuts to healthcare - he annotates his initial opinions and the comparison to the rest of the UK and shares it on the platform.
