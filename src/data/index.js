const mockSlide1 = `
[How succesful](#id0) is [the NHS](#id1) at delivering on the targets
for referral to treatment for [cancer patients](#id2) in the UK?

---

# Measuring success [#id0 #Value]

Success can be measured in **many different ways** and _different measures_ have existed
in the past. The NHSs measures success by looking at the number of patients (in percentage)
that are still waiting for treatment after the aimed target lapsed.

Pick what the measure should be 
[RANGE unit: "percent" min: 1 max: 100 step: 1]

#### The NHS target in England [#85]
The NHS *in England* currently aims to refer **85%** of the patients to treatment" 

#### The NHS target for Scotland and Wales [#95]
In Scotland and Wales the aim is to refer **95%** in time. 

# The NHS [#id1]

There is a different organizing body in England and Scotland... We could put other information here

1. One 
2. Two
3. Three

# Same targets for different cancer? [#id2 #Choice]

Some text about aggreagating different cancer types.

- Aggregate all [#Choice1]
- Split by cancer group [#Choice2]

#### Aggregating all types of cancer [#Choice1]

The NHS currently does not distinguish between cancer types when establishing the targets for cancer types.
There could be much more text here and also some *markdown*!

#### Splitting by cancer type [#choice2]

You can also look at the different cancer types.
`;

export const testMd = `
It's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)

Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this

If you want to embed images, this is how you do it:

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
# Structured documents

Sometimes it's useful to have different levels of headings to structure your documents. 

### This is a third-tier heading

If you'd like to quote someone, use the > character before the line:

> Coffee. The finest organic suspension ever devised... I beat the Borg with it.
> - Captain Janeway

GitHub supports many extras in Markdown that help you reference and link to people. If you ever want to direct a comment at someone, you can prefix their name with an @ symbol: Hey @kneath — love your sweater!

But I have to admit, tasks lists are my favorite:

- [x] This is a complete item
- [ ] This is an incomplete item

When you include a task list in the first comment of an Issue, you will see a helpful progress bar in your list of issues. It works in Pull Requests, too!

And, of course emoji! :sparkles: :camel: :boom:
`;

export default mockSlide1;
