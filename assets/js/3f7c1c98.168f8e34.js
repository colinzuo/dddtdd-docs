"use strict";(self.webpackChunkdoc_center=self.webpackChunkdoc_center||[]).push([[9937],{30889:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>m,contentTitle:()=>s,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var o=t(74848),a=t(28453);const r={},s=void 0,i={id:"topic/llm/auto-gpt/cli-startup-flow",title:"cli-startup-flow",description:"autogpt/init.py",source:"@site/docs/00800-topic/llm/auto-gpt/cli-startup-flow.md",sourceDirName:"00800-topic/llm/auto-gpt",slug:"/topic/llm/auto-gpt/cli-startup-flow",permalink:"/dddtdd-docs/topic/llm/auto-gpt/cli-startup-flow",draft:!1,unlisted:!1,tags:[],version:"current",lastUpdatedBy:"Colin Zuo",lastUpdatedAt:1720187019e3,frontMatter:{},sidebar:"docSidebar",previous:{title:"README",permalink:"/dddtdd-docs/topic/llm/auto-gpt/"},next:{title:"README",permalink:"/dddtdd-docs/topic/llm/langchain/"}},m={},l=[{value:"autogpt/<strong>init</strong>.py",id:"autogptinitpy",level:2},{value:"autogpt/<strong>main</strong>.py",id:"autogptmainpy",level:2},{value:"autogpt/cli.py",id:"autogptclipy",level:2},{value:"autogpt/main.py",id:"autogptmainpy-1",level:2},{value:"autogpt/config/config.py",id:"autogptconfigconfigpy",level:3},{value:"autogpt/configurator.py",id:"autogptconfiguratorpy",level:3},{value:"autogpt/commands/command.py",id:"autogptcommandscommandpy",level:3},{value:"autogpt/prompts/prompt.py",id:"autogptpromptspromptpy",level:3},{value:"autogpt/config/ai_config.py",id:"autogptconfigai_configpy",level:3},{value:"autogpt/memory/<strong>init</strong>.py",id:"autogptmemoryinitpy",level:3},{value:"autogpt/memory/redismem.py",id:"autogptmemoryredismempy",level:3},{value:"autogpt/config/ai_config.py",id:"autogptconfigai_configpy-1",level:3},{value:"autogpt/prompts/prompt.py",id:"autogptpromptspromptpy-1",level:3},{value:"autogpt/prompts/generator.py",id:"autogptpromptsgeneratorpy",level:3},{value:"autogpt/agent/agent.py",id:"autogptagentagentpy",level:3},{value:"autogpt/agent/agent.py",id:"autogptagentagentpy-1",level:2},{value:"autogpt/llm/chat.py",id:"autogptllmchatpy",level:3},{value:"autogpt/memory_management/summary_memory.py",id:"autogptmemory_managementsummary_memorypy",level:3},{value:"autogpt/llm/chat.py",id:"autogptllmchatpy-1",level:3},{value:"autogpt/agent/agent.py",id:"autogptagentagentpy-2",level:3}];function p(n){const e={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,a.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(e.h2,{id:"autogptinitpy",children:["autogpt/",(0,o.jsx)(e.strong,{children:"init"}),".py"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:"# Load the users .env file into environment variables\nload_dotenv(verbose=True, override=True)\n"})}),"\n",(0,o.jsxs)(e.h2,{id:"autogptmainpy",children:["autogpt/",(0,o.jsx)(e.strong,{children:"main"}),".py"]}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsxs)(e.a,{href:"https://docs.python.org/3/library/__main__.html#module-__main__",children:["https://docs.python.org/3/library/",(0,o.jsx)(e.strong,{children:"main"}),".html#module-",(0,o.jsx)(e.strong,{children:"main"})]})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'import autogpt.cli\n\nif __name__ == "__main__":\n    autogpt.cli.main()\n'})}),"\n",(0,o.jsx)(e.h2,{id:"autogptclipy",children:"autogpt/cli.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:"    from autogpt.main import run_auto_gpt\n\n    if ctx.invoked_subcommand is None:\n        run_auto_gpt(\n            continuous,\n            continuous_limit,\n            ai_settings,\n            skip_reprompt,\n            speak,\n            debug,\n            gpt3only,\n            gpt4only,\n            memory_type,\n            browser_name,\n            allow_downloads,\n            skip_news,\n            workspace_directory,\n            install_plugin_deps,\n        )\n"})}),"\n",(0,o.jsx)(e.h2,{id:"autogptmainpy-1",children:"autogpt/main.py"}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.code,{children:"    cfg = Config()"})}),"\n",(0,o.jsx)(e.h3,{id:"autogptconfigconfigpy",children:"autogpt/config/config.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'class Config(metaclass=Singleton):\n    """\n    Configuration class to store the state of bools for different scripts access.\n    """\n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptconfiguratorpy",children:"autogpt/configurator.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:"    create_config(\n        continuous,\n        continuous_limit,\n        ai_settings,\n        skip_reprompt,\n        speak,\n        debug,\n        gpt3only,\n        gpt4only,\n        memory_type,\n        browser_name,\n        allow_downloads,\n        skip_news,\n    )\n"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'CFG = Config()\n\ndef create_config(\n    continuous: bool,\n    continuous_limit: int,\n    ai_settings_file: str,\n    skip_reprompt: bool,\n    speak: bool,\n    debug: bool,\n    gpt3only: bool,\n    gpt4only: bool,\n    memory_type: str,\n    browser_name: str,\n    allow_downloads: bool,\n    skip_news: bool,\n) -> None:\n\n    if debug:\n        logger.typewriter_log("Debug Mode: ", Fore.GREEN, "ENABLED")\n        CFG.set_debug_mode(True)\n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptcommandscommandpy",children:"autogpt/commands/command.py"}),"\n",(0,o.jsx)(e.p,{children:"autogpt/main.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:"    # Create a CommandRegistry instance and scan default folder\n    command_registry = CommandRegistry()\n\n    for command_category in command_categories:\n        command_registry.import_commands(command_category)    \n"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",metastring:'title="autogpt/commands/command.py"',children:'class CommandRegistry:\n    """\n    The CommandRegistry class is a manager for a collection of Command objects.\n    It allows the registration, modification, and retrieval of Command objects,\n    as well as the scanning and loading of command plugins from a specified\n    directory.\n    """\n\n    def __init__(self):\n        self.commands = {}\n'})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",metastring:'title="autogpt/commands/command.py"',children:'def command(\n    name: str,\n    description: str,\n    signature: str = "",\n    enabled: bool = True,\n    disabled_reason: Optional[str] = None,\n) -> Callable[..., Any]:\n    """The command decorator is used to create Command objects from ordinary functions."""\n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptpromptspromptpy",children:"autogpt/prompts/prompt.py"}),"\n",(0,o.jsx)(e.p,{children:"autogpt/main.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'    ai_name = ""\n    ai_config = construct_main_ai_config()\n    ai_config.command_registry = command_registry\n    if ai_config.ai_name:\n        ai_name = ai_config.ai_name\n'})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'def construct_main_ai_config() -> AIConfig:\n    """Construct the prompt for the AI to respond to\n\n    Returns:\n        str: The prompt string\n    """\n    config = AIConfig.load(CFG.ai_settings_file)\n\n    if not config.ai_name:\n        config = prompt_user()\n        config.save(CFG.ai_settings_file)    \n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptconfigai_configpy",children:"autogpt/config/ai_config.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'class AIConfig:\n    """\n    A class object that contains the configuration information for the AI\n\n    Attributes:\n        ai_name (str): The name of the AI.\n        ai_role (str): The description of the AI\'s role.\n        ai_goals (list): The list of objectives the AI is supposed to complete.\n        api_budget (float): The maximum dollar value for API calls (0.0 means infinite)\n    """\n'})}),"\n",(0,o.jsxs)(e.h3,{id:"autogptmemoryinitpy",children:["autogpt/memory/",(0,o.jsx)(e.strong,{children:"init"}),".py"]}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.code,{children:"memory = get_memory(cfg, init=True)"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'def get_memory(cfg, init=False):\n    memory = None\n\n    elif cfg.memory_backend == "redis":\n            memory = RedisMemory(cfg)    \n\n    if memory is None:\n        memory = LocalCache(cfg)\n        if init:\n            memory.clear()\n    return memory            \n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptmemoryredismempy",children:"autogpt/memory/redismem.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'class RedisMemory(MemoryProviderSingleton):\n\n    def add(self, data: str) -> str:\n\n        vector = get_ada_embedding(data)\n        vector = np.array(vector).astype(np.float32).tobytes()\n        data_dict = {b"data": data, "embedding": vector}\n        pipe = self.redis.pipeline()\n        pipe.hset(f"{self.cfg.memory_index}:{self.vec_num}", mapping=data_dict)\n\n    def get_relevant(self, data: str, num_relevant: int = 5) -> list[Any] | None:\n\n        query_embedding = get_ada_embedding(data)\n        base_query = f"*=>[KNN {num_relevant} @embedding $vector AS vector_score]"\n        query = (\n            Query(base_query)\n            .return_fields("data", "vector_score")\n            .sort_by("vector_score")\n            .dialect(2)\n        )\n        query_vector = np.array(query_embedding).astype(np.float32).tobytes()\n\n        try:\n            results = self.redis.ft(f"{self.cfg.memory_index}").search(\n                query, query_params={"vector": query_vector}\n            )                            \n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptconfigai_configpy-1",children:"autogpt/config/ai_config.py"}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.code,{children:"system_prompt = ai_config.construct_full_prompt()"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'    def construct_full_prompt(\n        self, prompt_generator: Optional[PromptGenerator] = None\n    ) -> str:\n\n        prompt_start = (\n            "Your decisions must always be made independently without"\n            " seeking user assistance. Play to your strengths as an LLM and pursue"\n            " simple strategies with no legal complications."\n            ""\n        )\n\n        full_prompt = f"You are {prompt_generator.name}, {prompt_generator.role}\\n{prompt_start}\\n\\nGOALS:\\n\\n"\n        for i, goal in enumerate(self.ai_goals):\n            full_prompt += f"{i+1}. {goal}\\n"\n        if self.api_budget > 0.0:\n            full_prompt += f"\\nIt takes money to let you run. Your API budget is ${self.api_budget:.3f}"\n        self.prompt_generator = prompt_generator\n        full_prompt += f"\\n\\n{prompt_generator.generate_prompt_string()}"\n        return full_prompt        \n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptpromptspromptpy-1",children:"autogpt/prompts/prompt.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python"})}),"\n",(0,o.jsx)(e.h3,{id:"autogptpromptsgeneratorpy",children:"autogpt/prompts/generator.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'class PromptGenerator:\n    """\n    A class for generating custom prompt strings based on constraints, commands,\n        resources, and performance evaluations.\n    """\n\n    def __init__(self) -> None:\n\n        self.response_format = {\n            "thoughts": {\n                "text": "thought",\n                "reasoning": "reasoning",\n                "plan": "- short bulleted\\n- list that conveys\\n- long-term plan",\n                "criticism": "constructive self-criticism",\n                "speak": "thoughts summary to say to user",\n            },\n            "command": {"name": "command name", "args": {"arg name": "value"}},\n        }\n\n    def _generate_command_string(self, command: Dict[str, Any]) -> str:\n        """\n        Generate a formatted string representation of a command.\n\n        Args:\n            command (dict): A dictionary containing command information.\n\n        Returns:\n            str: The formatted command string.\n        """\n        args_string = ", ".join(\n            f\'"{key}": "{value}"\' for key, value in command["args"].items()\n        )\n        return f\'{command["label"]}: "{command["name"]}", args: {args_string}\'\n\n    def _generate_numbered_list(self, items: List[Any], item_type="list") -> str:\n        """\n        Generate a numbered list from given items based on the item_type.\n\n        Args:\n            items (list): A list of items to be numbered.\n            item_type (str, optional): The type of items in the list.\n                Defaults to \'list\'.\n\n        Returns:\n            str: The formatted numbered list.\n        """\n        if item_type == "command":\n            command_strings = []\n            if self.command_registry:\n                command_strings += [\n                    str(item)\n                    for item in self.command_registry.commands.values()\n                    if item.enabled\n                ]\n            # terminate command is added manually\n            command_strings += [self._generate_command_string(item) for item in items]\n            return "\\n".join(f"{i+1}. {item}" for i, item in enumerate(command_strings))\n        else:\n            return "\\n".join(f"{i+1}. {item}" for i, item in enumerate(items))\n\n    def generate_prompt_string(self) -> str:\n        """\n        Generate a prompt string based on the constraints, commands, resources,\n            and performance evaluations.\n\n        Returns:\n            str: The generated prompt string.\n        """\n        formatted_response_format = json.dumps(self.response_format, indent=4)\n        return (\n            f"Constraints:\\n{self._generate_numbered_list(self.constraints)}\\n\\n"\n            "Commands:\\n"\n            f"{self._generate_numbered_list(self.commands, item_type=\'command\')}\\n\\n"\n            f"Resources:\\n{self._generate_numbered_list(self.resources)}\\n\\n"\n            "Performance Evaluation:\\n"\n            f"{self._generate_numbered_list(self.performance_evaluation)}\\n\\n"\n            "You should only respond in JSON format as described below \\nResponse"\n            f" Format: \\n{formatted_response_format} \\nEnsure the response can be"\n            " parsed by Python json.loads"\n        )                                        \n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptagentagentpy",children:"autogpt/agent/agent.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:"    agent = Agent(\n        ai_name=ai_name,\n        memory=memory,\n        full_message_history=full_message_history,\n        next_action_count=next_action_count,\n        command_registry=command_registry,\n        config=ai_config,\n        system_prompt=system_prompt,\n        triggering_prompt=DEFAULT_TRIGGERING_PROMPT,\n        workspace_directory=workspace_directory,\n    )\n    agent.start_interaction_loop()\n"})}),"\n",(0,o.jsx)(e.h2,{id:"autogptagentagentpy-1",children:"autogpt/agent/agent.py"}),"\n",(0,o.jsx)(e.h3,{id:"autogptllmchatpy",children:"autogpt/llm/chat.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'            with Spinner("Thinking... "):\n                assistant_reply = chat_with_ai(\n                    self,\n                    self.system_prompt,\n                    self.triggering_prompt,\n                    self.full_message_history,\n                    self.memory,\n                    cfg.fast_token_limit,\n                )\n'})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'def chat_with_ai(\n    agent, prompt, user_input, full_message_history, permanent_memory, token_limit\n):\n    """Interact with the OpenAI API, sending the prompt, user input, message history,\n    and permanent memory."""\n\n            model = cfg.fast_llm_model  # TODO: Change model from hardcode to argument\n            # Reserve 1000 tokens for the response\n            logger.debug(f"Token limit: {token_limit}")\n            send_token_limit = token_limit - 1000\n\n            (\n                next_message_to_add_index,\n                current_tokens_used,\n                insertion_index,\n                current_context,\n            ) = generate_context(prompt, relevant_memory, full_message_history, model)    \n\n            current_tokens_used += count_message_tokens(\n                [create_chat_message("user", user_input)], model\n            )  # Account for user input (appended later)\n\n            # \u5012\u5e8f\u6dfb\u52a0history\uff0c\u4e5f\u5c31\u662f\u6dfb\u52a0\u6700\u8fd1\u7684history\u76f4\u5230\u8d85\u51fa\u9650\u5236\n            while next_message_to_add_index >= 0:\n                # print (f"CURRENT TOKENS USED: {current_tokens_used}")\n                message_to_add = full_message_history[next_message_to_add_index]                        \n'})}),"\n",(0,o.jsx)(e.p,{children:"\u63d0\u53d6\u65b0\u7684message history\uff0c\u7136\u540e\u7528\u5b83\u66f4\u65b0summary memory"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:"            if len(full_message_history) > 0:\n                (\n                    newly_trimmed_messages,\n                    agent.last_memory_index,\n                ) = get_newly_trimmed_messages(\n                    full_message_history=full_message_history,\n                    current_context=current_context,\n                    last_memory_index=agent.last_memory_index,\n                )\n\n                agent.summary_memory = update_running_summary(\n                    agent,\n                    current_memory=agent.summary_memory,\n                    new_events=newly_trimmed_messages,\n                )\n                current_context.insert(insertion_index, agent.summary_memory)\n"})}),"\n",(0,o.jsx)(e.h3,{id:"autogptmemory_managementsummary_memorypy",children:"autogpt/memory_management/summary_memory.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'def update_running_summary(\n    agent: Agent, current_memory: str, new_events: List[Dict[str, str]]\n) -> str:\n\n   prompt = f\'\'\'Your task is to create a concise running summary of actions and information results in the provided text, focusing on key and potentially important information to remember.\n\nYou will receive the current summary and the your latest actions. Combine them, adding relevant key information from the latest development in 1st person past tense and keeping the summary concise.\n\nSummary So Far:\n"""\n{current_memory}\n"""\n\nLatest Development:\n"""\n{new_events}\n"""\n\'\'\'\n\n    messages = [\n        {\n            "role": "user",\n            "content": prompt,\n        }\n    ]\n\n    current_memory = create_chat_completion(messages, cfg.fast_llm_model)\n\n    message_to_return = {\n        "role": "system",\n        "content": f"This reminds you of these events from your past: \\n{current_memory}",\n    }\n\n    return message_to_return\n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptllmchatpy-1",children:"autogpt/llm/chat.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'            # Append user input, the length of this is accounted for above\n            current_context.extend([create_chat_message("user", user_input)])\n\n            assistant_reply = create_chat_completion(\n                model=model,\n                messages=current_context,\n                max_tokens=tokens_remaining,\n            )\n\n            # Update full message history\n            full_message_history.append(create_chat_message("user", user_input))\n            full_message_history.append(\n                create_chat_message("assistant", assistant_reply)\n            )\n\n            return assistant_reply            \n'})}),"\n",(0,o.jsx)(e.h3,{id:"autogptagentagentpy-2",children:"autogpt/agent/agent.py"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-python",children:'            assistant_reply_json = fix_json_using_multiple_techniques(assistant_reply)\n\n                    command_name, arguments = get_command(assistant_reply_json)\n\n                command_result = execute_command(\n                    self.command_registry,\n                    command_name,\n                    arguments,\n                    self.config.prompt_generator,\n                )\n                result = f"Command {command_name} returned: " f"{command_result}"\n\n                self.full_message_history.append(create_chat_message("system", result))                                    \n'})})]})}function c(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(p,{...n})}):p(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>s,x:()=>i});var o=t(96540);const a={},r=o.createContext(a);function s(n){const e=o.useContext(r);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(a):n.components||a:s(n.components),o.createElement(r.Provider,{value:e},n.children)}}}]);