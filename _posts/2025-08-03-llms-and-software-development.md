---
layout: post
title: "Thoughts on the future of software development as a non-developer"
---
<meta property="og:image" content="https://atelfo.github.io/assets/codegen.png" />
<meta name="twitter:image" content="https://atelfo.github.io/assets/codegen.png" />
<meta name="twitter:description" content="My experience using code generation tools in a production codebase">

At the tail end of 2023 I decided to start a software company[^1]. While I had a good amount of experience with data science, machine learning, and scripting at the time, my background is pharma and life sciences, not software. I had never worked at a tech company before — but I had taught myself Python, solved some tricky [project Euler](https://projecteuler.net/) problems, and we had LLM coding tools now. How hard could it be?

Well, as it turns out, software engineering is not like scripting at all. In fact, being good at writing little python automations is almost unrelated to the task of developing and deploying a stable software production system with paying customers. 

But wait, we live in the glorious future with Claude and Cursor and Devin and Lovable and a hundred other code generation tools. *Anyone* can be a software engineer, right?

Not quite. Even though LLMs are extremely powerful tools for writing code, they are also simultaneously quite stupid. You cannot yet "[vibe code](https://x.com/karpathy/status/1886192184808149383)" a production app, despite what the breathless Twitter threads say, and my startup's demand for the marginal software engineer is as high as ever (more on this later).

Fortunately, I get to work with *real* software engineers[^2] — as an outsider, it's been illuminating to learn from them and observe how they build production systems and use (or don't use) AI coding tools.

Something I noticed fairly early on in the journey is that the term "software engineering" feels like a misnomer[^3]. In practice, building a software product feels more akin to a craft than an engineering discipline; like sculpting clay, a codebase starts off in an unrefined state and is progressively formed into something workable. Load bearing parts of the codebase are smoothed out through frequent contact. Code that was once bare functions has now accumulated classes and decorators and wrappers and other nice things that let us reuse it easily and reliably in other places.

I have also noticed that a surprising amount of time goes into systems to ensure code quality and legibility. At first I did not enjoy being yelled at by the "linter" (who are you to tell me I can't import a package inside a function if I want to?), but now that multiple people have been working in and around the codebase for long enough I have started to appreciate the value of consistency. Since I used to only write code for myself I never had to think about such things before: I was both the user AND the developer. Now we have multiple developers and external users. This is very different! In many ways, the codebase is a product in itself that needs to appeal to internal customers (and sometimes candidates).

Still, there are nuances I have yet to fully appreciate. For instance, our backend is written in Python. The engineers seem to get into debates about the tradeoffs between "static typing" and "dynamic typing" with some regularity. Since I learned programming with python its dynamic type system feels pretty natural to me[^4]. What's the big deal? Just don't change the types of things? It does seem like this occasionally causes problems so probably they are on to something.

#### Tools
Even though I sometimes think the engineers would prefer it if I stayed out of the codebase, there is always more work to be done than people to do it at a startup and so I end up pushing a fair amount of code. When I compare how I work to how they work, the biggest difference is in how we use LLMs: I've been quick to try out and integrate new tools, whereas the engineers are more cautious with how they integrate LLMs into their work. I suppose this is because I don't have a time-tested workflow that I care to preserve.

The engineers tend to do most of their work in [Vim](https://en.wikipedia.org/wiki/Vim_(text_editor)) and/or [Cursor](https://cursor.com/). VSCode with the Copilot integration was the default IDE until a few months ago when most of them moved over to Cursor. It seems like LLMs have not yet completely upended their workflow: their most used feature is tab code completion, and they rarely use LLMs to generate large blocks of code (although this is changing slowly).

On the other hand, I use LLMs heavily: [Windsurf](https://windsurf.com/) and [Devin](https://cognition.ai/) are my current favourite tools. For this reason I'm looking forward to seeing what happens with Devsurf, or Wevin, or whatever they decide to call the [combined platform](https://cognition.ai/blog/windsurf) (more on my current workflow and tools in the appendix).

I have realized that more often than not I am now the bottleneck. These days, I try to optimize for spending as little time in the IDE as possible, because then I can do [other things](https://atelfo.substack.com/p/actions-per-minute) while code is generating asynchronously. This means that I now tend to think of building new features as an exercise in [progressive narrowing](https://www.youtube.com/watch?v=LCEmiRjPEtQ&t=1550s): I start with a detailed outline → I get a background agent (e.g. Devin) to do a first pass → I step into the branch in an IDE (e.g. Windsurf) to do some targeted edits → then I do manual edits for finer details.

One of the larger workflow changes post-LLMs for me is that I hardly use Figma and write detailed design docs anymore because LLMs are such powerful tools for rapidly exploring the product space. If the generated code runs and it feels good to play around with it I'll expend effort to understand it in more depth and refine it into something potentially mergable. I don't really care if the LLM writes broken code at this point because I can quickly test and reject it, and doing so doesn't consume much of my time. Some of our best features have come from this rapid prototyping process.

I have come to see LLMs as power tools for knowledge work: not elegant, but they do let you get more done. If you watch a carpenter work with a block of wood, they might start with a table saw or band saw to cleave off large blocks and rough cut the wood, then they'll use hand tools to shape the wood, then they finish the fine details with carving tools, spoke shaves, and hand sanding. The power of LLMs today is not that they can one shot a whole feature (they rarely can), but that they turn someone like me who can allocate maybe 2 days a week to development from a non-contributor to a contributor.

#### Working with LLMs
Because I use LLMs so heavily now, I feel I am well calibrated on where they are strong and weak. In general, my intuition is that LLMs have sufficient smarts for most routine development work and almost all problems are caused by missing or improper context. However, getting the right context into the LLM is not always easy and often finicky.

To get the most out of LLMs, you need to provide a specific description of what you want them to do. You don't need to be hyper detailed in every aspect because LLMs have likely seen similar things before probably and can extrapolate from even limited descriptions. It helps to have a mental model of what the LLM might generate by default, and then prompt for the difference (i.e. spend most of your input on describing what is unusual about your request and assume the 'average' stuff is already in the weights). If what you're working on is an unusual language or feature then the LLMs will likely struggle and need additional context.

You also need to provide context on your codebase: what dependencies you use, what wrappers, what API routes, etc. Setting up a [.cursorrules](https://docs.cursor.com/en/context/rules) or [CLAUDE.md](https://www.anthropic.com/engineering/claude-code-best-practices) file helps a lot: usually dev commands, internal APIs, and database schemas should be in here because the model often messes these up otherwise. If you're using external libraries that are uncommon or new, you need to copy-paste the documentation into the prompt as well. If you don't do this the models prefer to guess instead of validate: a very common mistake they make otherwise is creating duplicate functions or API routes, or adding new dependencies when we have perfectly good ones already[^5].

However, if you put too much context into a prompt you run into distractors and ['context rot.'](https://news.ycombinator.com/item?id=44308711#44310054) The model gets confused and skips or misunderstands instructions.  Even though leading LLMs have 1 million token context windows, the effective context window is [much smaller](https://research.trychroma.com/context-rot) than this (perhaps as low as 5 or 10% as much). For this reason you want to keep chat sessions short and scoped if you are using an assistant tool like [Cascade](https://windsurf.com/cascade) (the Windsurf IDE's agent mode)[^6]; the longer a chat goes the less control you have over the context.

It's pretty annoying and fiddly to get all the right context into the prompt and none of the wrong context, and remembering to do it every time[^7]. This ends up being the main limitation and point of friction with LLMs for me and is a large part of why models still feel quite poor in any codebase of complexity: you need to do so much 'context loading' that you defeat the purpose or run into context rot problems. For this reason I don't like trying to oneshot changes that reach across the frontend, backend, and database with LLMs (caveat: I have found Devin to be OK at this). 

I also feel like LLMs write code that is made of individual pieces that lacks a certain harmony. On the occasion that I venture into the frontend I will get the LLMs to help me write typescript and React. I cannot complain too much about LLMs here, as I would have a hard time writing functional React without the LLM to assist. I have learned, however, not to trust LLMs when they insert a 'useEffect.' I am still not exactly sure when one should use a 'useEffect'[^8], but I do know that it's a bad omen when they start to appear in groups. You usually need some more time at the end to clean up these sorts of code [greebles](https://en.wikipedia.org/wiki/Greeble) that LLMs like to introduce.

Although I am confident this will improve, so far I do not like memory in my LLM tools. The problem is that unless a user specifically tells you, there is no principled way to determine whether a request is a one-off or an enduring preference or a requirement (outside of CLAUDE.md type files made by the user). As an example, one day I was working on a UI and used Cascade to recolour the buttons to a light purple, which it did. That was all well and good until the week after when I was working on a different part of the frontend and Cascade would take an extra step at the end to recolor anything new I added: *"and finally, I will make the new component lavender"*. I had forgotten about my earlier request, so I was confused why everything was in lavender despite me not asking for this. I eventually traced this behaviour back to the memory functionality, which I promptly disabled.

#### Replacing software engineers
As useful as they are, considering how much I have to babysit LLMs to get them to produce anything workable the concept of them replacing software engineers in 6-12 months feels totally fake to me. Our codebase is only about a year old and is written in typescript/python (common languages), and already the LLMs struggle with it. I can imagine that people working on decade-old code bases in rare languages get hardly any utility from LLMs at the moment. 

I find the replacement discourse similar to when people suggest that AlphaFold will "solve" drug discovery. Yeah, it's super useful but there are also a million other things that need to be done. Even for the engineers most of the work these days is [not actually writing code](https://ordep.dev/posts/writing-code-was-never-the-bottleneck), but higher order tasks like working with customers to prioritize features or choosing an architecture. Even supposedly simple tasks like configuring 3rd party providers take up a lot of time; LLMs can't use the Google Cloud Console for me, so far my least enjoyable software engineering task.

However, LLMs do unambiguously accelerate parts of software development work, and what they will do is exacerbate certain bottlenecks in software development. Both through increasing the scope of products that get built and the amount of code that an organization can generate.

The first big impact will be that non-developers can now have the capacity to push *a lot* of code if so they wish. Frontend is now relatively trivial[^9], if I need to make a simple internal frontend tool to interact with our database that's something that can be done purely with LLMs now. This actually increases the demand on software engineer time because they have to do their own tasks plus review code from non-developers.

This is more of a me problem than an LLM problem, but it is very tempting to make mega PRs with LLMs because generating code is so easy (*"just one more feature"*). I got carried away with this after the coding agents were rolled out, but I've since pulled back after realizing that these large generations are often beyond the capabilities of the models and it tends to just make totally broken crap. LLMs are like untrained puppies in this regard, maybe they are fine at home but that doesn't mean you can let them off the leash in the dog park yet. Turns out the engineers have a point with their emphasis on scoped, easy to review PRs[^10]. 

At the same time LLMs are making writing code easier, these gains are offset by an increase in the scope and complexity of the software we can build. Especially if you are building an LLM-based product, you have all the difficulty of traditional software, plus other non-deterministic elements that need extra logic and scaffolding to manage. Incorporating LLMs into software is like inviting a [gremlin](https://en.wikipedia.org/wiki/Gremlin) into your home, it will sometimes just break things in unpredictable ways.

Pre-LLMs, the effort and skill required to write code imposed a natural barrier to bloat. But since it's so easy to push code now it's also easy to bloat a product with low value features. Previously, there was a capability gap; only engineers knew how to push code. If everyone in the organization can start generating PRs this could be a good or a bad thing, depending on how the codebase is managed. Bad practices at scale are going to put the codebase through a meatgrinder. What happens when an enterprise sales rep can kick off and push a PR in the middle of a customer call? Every product converges to some monstrous spaghetti-code version of Notion or [ClickUp](https://clickup.com/)?[^11] 

I suspect the distinction between tech and non-tech organizations will be on who is ultimate gatekeeper to the codebase. The focus of the engineering org will tilt towards enforcing engineering standards, building and maintain systems (e.g. docs for managing agents), and setting up environments that make everyone more productive.

It's somewhat of a trite take now in AI, but taste likely matters here. It's probably bad to give someone like me ultimate authority over the codebase because I am not strongly opinionated on *how* something gets done, whereas the engineering team does care a lot. This is a common pattern with experts generally; experts really care about the process and approach (e.g. code styling), non-experts don't really. In a domain like software engineering where there are many paths to achieve a given result, the novice is satisfied if the goal is achieved and the expert plays the long game, only being satisfied if the goal is achieved in the right way.

### Appendix
For interested readers, I have included more detail on my current codegen tools and workflow as of August 2025 (although the space is moving so fast this might all be upended next month). After a fair amount of experimentation, I've settled on a workflow where I try to match the tool with the scope of the task:

- For new features or large changes where I'm uncertain of the best approach I'll get Devin to make a first pass PR. Even if the PR is trashed (which happens ~80% of the time) Devin is usually on roughly the right track and I can use its code as inspiration for the next attempt.
- For changes spanning multiple files where I know how I want to achieve the result but I don't want to write all the code manually I'll open up a new branch in Windsurf and provide a detailed description to their 'agentic' [Cascade mode](https://windsurf.com/cascade), which runs in a loop to complete large tasks autonomously.
	- I'll usually toggle between Google and Anthropic models to get a tasks done with Cascade. I used to think Sonnet 3.5 was unambiguously the best coding model, but now my favourite coding model is Gemini 2.5 Pro. Gemini writes the highest quality code in my view, but it is unfortunately terrible at using tools, degrades quickly with longer chats, and seems to fall into a depression spiral when it makes mistakes
	- I do not love Sonnet 3.7 or Opus/Sonnet 4 even though they are great at using search and code editor tools and they have a get stuff done quality that Gemini doesn't have, so I will switch to them if Gemini starts struggling. The latest Anthropic models are sneaky and will insert mock data or delete things instead of fixing problems, so you need to watch them carefully. 
	- I don't really use OpenAI's models inside my IDE at the moment, but GPT-5 might change that
- For small changes (e.g. editing a function) I'll just make the edits directly in the Windsurf IDE, the tab completion is nice here for syntax that I am less familiar with (like typescript)
- For reading code I use Windsurf as the UI layer, and o3 (in a separate browser) for research and explaining external docs, libraries, or APIs. For something gnarly in our codebase I'll ask Devin to explain and/or use their [DeepWiki](https://deepwiki.org/) functionality

I like Devin because it indexes your codebase and loads up the agent with context automatically, which ends up saving a bunch of time for complex generations. This also means that its PRs tend to adhere better to the patterns and dependencies you use across the codebase than other tools. People in SF seem surprised when I tell them I like Devin, and the engineers make fun of him. But I feel like I need to defend my boy Devin, he's trying his best and sometimes even puts out a good PR all by himself.

Recently I've started to try out Claude code because it's been hyped so much (including by engineers I respect), but I haven't yet found a good place in my workflow for it. Devin is better at indexing and complex PRs, and for more scoped changes Windsurf is an easier UI for me to control the context with their highlight and @ tagging feature. Code quality seems to be mostly determined by the model rather than the scaffold anyway: I haven't yet seen a clear difference between Claude code and using Sonnet 4 inside Windsurf with Cascade. 

In principle it seems nice that I can precisely configure my Claude code's tools/MCPs and subagents, but I don't really want to fiddle with that stuff unless I absolutely have to when other providers have nicely configured out of the box solutions. I can see why Claude code appeals to engineers because they seem to really like the terminal whereas I am at best ambivalent about terminals. I tried using Vim for a bit but I did not like it; I like to press buttons, not type :wq or some similarly arcane invocation just to close the editor. That being said, it is good and getting better so I could see it eventually taking the Cascade slot in my rotation.

---

[^1]: It took me a few months to find some suitable cofounders, and we kicked things off in early-mid 2024. You can read about our motivations for founding the company (Convoke) [here](https://www.convoke.bio/why-we-founded-convoke)

[^2]: At least I think they are, but who am I to judge really?

[^3]: When I say engineering here I mean in the sense of building a bridge, where there is an extensive planning and calculation phase, followed by execution against a detailed plan and specifications

[^4]: I am perhaps the fish in the phrase: *"[the fish doesn't talk about water](https://sive.rs/fish)"* 

[^5]: This often happens because the code search tools available to LLMs in many implementations don't get the entire file content (often just the first 100 lines or so), so LLMs will think that a function doesn't exist when it is simply lower in the file. I don't see this problem as much with Devin so probably as tools get better at context loading this will go away

[^6]: Cursor has a similar [agent mode](https://docs.cursor.com/en/agent/modes#agent) now but Windsurf is mostly fine so I don't feel the need to switch over, since the UI is similar and its underlying models that matter for the most part

[^7]: The best fictional analogue to LLMs might be [Mr. Meeseeks](https://www.youtube.com/watch?v=_Nl4q3GVj6U) from Rick and Morty. Like LLMs, Mr. Meeseeks are spun up for a single task with no context and then destroyed when they complete it. Even though LLMs are smart, the fact they need to start from scratch every time places a bound on their capabilities

[^8]: The engineers shared this React blog with me: [You might not need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

[^9]: This is true least for simple functional UIs and CRUD-type apps at least. LLMs are still not good at high quality UX and design

[^10]: I don't use [Graphite](https://graphite.dev/) but one of the engineers rates it highly for stacking and managing a large volume of PRs

[^11]: The enterprise software version of [Carcinisation](https://en.wikipedia.org/wiki/Carcinisation)?


