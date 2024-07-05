
## autogpt/__init__.py

```python
# Load the users .env file into environment variables
load_dotenv(verbose=True, override=True)
```

## autogpt/__main__.py

[https://docs.python.org/3/library/__main__.html#module-__main__](https://docs.python.org/3/library/__main__.html#module-__main__)

```python
import autogpt.cli

if __name__ == "__main__":
    autogpt.cli.main()
```

## autogpt/cli.py

```python
    from autogpt.main import run_auto_gpt

    if ctx.invoked_subcommand is None:
        run_auto_gpt(
            continuous,
            continuous_limit,
            ai_settings,
            skip_reprompt,
            speak,
            debug,
            gpt3only,
            gpt4only,
            memory_type,
            browser_name,
            allow_downloads,
            skip_news,
            workspace_directory,
            install_plugin_deps,
        )
```

## autogpt/main.py

`    cfg = Config()`

### autogpt/config/config.py

```python
class Config(metaclass=Singleton):
    """
    Configuration class to store the state of bools for different scripts access.
    """
```

### autogpt/configurator.py

```python
    create_config(
        continuous,
        continuous_limit,
        ai_settings,
        skip_reprompt,
        speak,
        debug,
        gpt3only,
        gpt4only,
        memory_type,
        browser_name,
        allow_downloads,
        skip_news,
    )
```

```python
CFG = Config()

def create_config(
    continuous: bool,
    continuous_limit: int,
    ai_settings_file: str,
    skip_reprompt: bool,
    speak: bool,
    debug: bool,
    gpt3only: bool,
    gpt4only: bool,
    memory_type: str,
    browser_name: str,
    allow_downloads: bool,
    skip_news: bool,
) -> None:

    if debug:
        logger.typewriter_log("Debug Mode: ", Fore.GREEN, "ENABLED")
        CFG.set_debug_mode(True)
```

### autogpt/commands/command.py

autogpt/main.py

```python
    # Create a CommandRegistry instance and scan default folder
    command_registry = CommandRegistry()

    for command_category in command_categories:
        command_registry.import_commands(command_category)    
```    

```python title="autogpt/commands/command.py"
class CommandRegistry:
    """
    The CommandRegistry class is a manager for a collection of Command objects.
    It allows the registration, modification, and retrieval of Command objects,
    as well as the scanning and loading of command plugins from a specified
    directory.
    """

    def __init__(self):
        self.commands = {}
```        

```python title="autogpt/commands/command.py"
def command(
    name: str,
    description: str,
    signature: str = "",
    enabled: bool = True,
    disabled_reason: Optional[str] = None,
) -> Callable[..., Any]:
    """The command decorator is used to create Command objects from ordinary functions."""
```

### autogpt/prompts/prompt.py

autogpt/main.py

```python
    ai_name = ""
    ai_config = construct_main_ai_config()
    ai_config.command_registry = command_registry
    if ai_config.ai_name:
        ai_name = ai_config.ai_name
```

```python
def construct_main_ai_config() -> AIConfig:
    """Construct the prompt for the AI to respond to

    Returns:
        str: The prompt string
    """
    config = AIConfig.load(CFG.ai_settings_file)

    if not config.ai_name:
        config = prompt_user()
        config.save(CFG.ai_settings_file)    
```

### autogpt/config/ai_config.py

```python
class AIConfig:
    """
    A class object that contains the configuration information for the AI

    Attributes:
        ai_name (str): The name of the AI.
        ai_role (str): The description of the AI's role.
        ai_goals (list): The list of objectives the AI is supposed to complete.
        api_budget (float): The maximum dollar value for API calls (0.0 means infinite)
    """
```

### autogpt/memory/__init__.py

`memory = get_memory(cfg, init=True)`

```python
def get_memory(cfg, init=False):
    memory = None

    elif cfg.memory_backend == "redis":
            memory = RedisMemory(cfg)    

    if memory is None:
        memory = LocalCache(cfg)
        if init:
            memory.clear()
    return memory            
```

### autogpt/memory/redismem.py

```python
class RedisMemory(MemoryProviderSingleton):

    def add(self, data: str) -> str:

        vector = get_ada_embedding(data)
        vector = np.array(vector).astype(np.float32).tobytes()
        data_dict = {b"data": data, "embedding": vector}
        pipe = self.redis.pipeline()
        pipe.hset(f"{self.cfg.memory_index}:{self.vec_num}", mapping=data_dict)

    def get_relevant(self, data: str, num_relevant: int = 5) -> list[Any] | None:

        query_embedding = get_ada_embedding(data)
        base_query = f"*=>[KNN {num_relevant} @embedding $vector AS vector_score]"
        query = (
            Query(base_query)
            .return_fields("data", "vector_score")
            .sort_by("vector_score")
            .dialect(2)
        )
        query_vector = np.array(query_embedding).astype(np.float32).tobytes()

        try:
            results = self.redis.ft(f"{self.cfg.memory_index}").search(
                query, query_params={"vector": query_vector}
            )                            
```

### autogpt/config/ai_config.py

`system_prompt = ai_config.construct_full_prompt()`

```python
    def construct_full_prompt(
        self, prompt_generator: Optional[PromptGenerator] = None
    ) -> str:

        prompt_start = (
            "Your decisions must always be made independently without"
            " seeking user assistance. Play to your strengths as an LLM and pursue"
            " simple strategies with no legal complications."
            ""
        )

        full_prompt = f"You are {prompt_generator.name}, {prompt_generator.role}\n{prompt_start}\n\nGOALS:\n\n"
        for i, goal in enumerate(self.ai_goals):
            full_prompt += f"{i+1}. {goal}\n"
        if self.api_budget > 0.0:
            full_prompt += f"\nIt takes money to let you run. Your API budget is ${self.api_budget:.3f}"
        self.prompt_generator = prompt_generator
        full_prompt += f"\n\n{prompt_generator.generate_prompt_string()}"
        return full_prompt        
```

### autogpt/prompts/prompt.py

```python

```

### autogpt/prompts/generator.py

```python
class PromptGenerator:
    """
    A class for generating custom prompt strings based on constraints, commands,
        resources, and performance evaluations.
    """

    def __init__(self) -> None:

        self.response_format = {
            "thoughts": {
                "text": "thought",
                "reasoning": "reasoning",
                "plan": "- short bulleted\n- list that conveys\n- long-term plan",
                "criticism": "constructive self-criticism",
                "speak": "thoughts summary to say to user",
            },
            "command": {"name": "command name", "args": {"arg name": "value"}},
        }

    def _generate_command_string(self, command: Dict[str, Any]) -> str:
        """
        Generate a formatted string representation of a command.

        Args:
            command (dict): A dictionary containing command information.

        Returns:
            str: The formatted command string.
        """
        args_string = ", ".join(
            f'"{key}": "{value}"' for key, value in command["args"].items()
        )
        return f'{command["label"]}: "{command["name"]}", args: {args_string}'

    def _generate_numbered_list(self, items: List[Any], item_type="list") -> str:
        """
        Generate a numbered list from given items based on the item_type.

        Args:
            items (list): A list of items to be numbered.
            item_type (str, optional): The type of items in the list.
                Defaults to 'list'.

        Returns:
            str: The formatted numbered list.
        """
        if item_type == "command":
            command_strings = []
            if self.command_registry:
                command_strings += [
                    str(item)
                    for item in self.command_registry.commands.values()
                    if item.enabled
                ]
            # terminate command is added manually
            command_strings += [self._generate_command_string(item) for item in items]
            return "\n".join(f"{i+1}. {item}" for i, item in enumerate(command_strings))
        else:
            return "\n".join(f"{i+1}. {item}" for i, item in enumerate(items))

    def generate_prompt_string(self) -> str:
        """
        Generate a prompt string based on the constraints, commands, resources,
            and performance evaluations.

        Returns:
            str: The generated prompt string.
        """
        formatted_response_format = json.dumps(self.response_format, indent=4)
        return (
            f"Constraints:\n{self._generate_numbered_list(self.constraints)}\n\n"
            "Commands:\n"
            f"{self._generate_numbered_list(self.commands, item_type='command')}\n\n"
            f"Resources:\n{self._generate_numbered_list(self.resources)}\n\n"
            "Performance Evaluation:\n"
            f"{self._generate_numbered_list(self.performance_evaluation)}\n\n"
            "You should only respond in JSON format as described below \nResponse"
            f" Format: \n{formatted_response_format} \nEnsure the response can be"
            " parsed by Python json.loads"
        )                                        
```

### autogpt/agent/agent.py

```python
    agent = Agent(
        ai_name=ai_name,
        memory=memory,
        full_message_history=full_message_history,
        next_action_count=next_action_count,
        command_registry=command_registry,
        config=ai_config,
        system_prompt=system_prompt,
        triggering_prompt=DEFAULT_TRIGGERING_PROMPT,
        workspace_directory=workspace_directory,
    )
    agent.start_interaction_loop()
```

## autogpt/agent/agent.py

### autogpt/llm/chat.py

```python
            with Spinner("Thinking... "):
                assistant_reply = chat_with_ai(
                    self,
                    self.system_prompt,
                    self.triggering_prompt,
                    self.full_message_history,
                    self.memory,
                    cfg.fast_token_limit,
                )
```

```python
def chat_with_ai(
    agent, prompt, user_input, full_message_history, permanent_memory, token_limit
):
    """Interact with the OpenAI API, sending the prompt, user input, message history,
    and permanent memory."""

            model = cfg.fast_llm_model  # TODO: Change model from hardcode to argument
            # Reserve 1000 tokens for the response
            logger.debug(f"Token limit: {token_limit}")
            send_token_limit = token_limit - 1000

            (
                next_message_to_add_index,
                current_tokens_used,
                insertion_index,
                current_context,
            ) = generate_context(prompt, relevant_memory, full_message_history, model)    

            current_tokens_used += count_message_tokens(
                [create_chat_message("user", user_input)], model
            )  # Account for user input (appended later)

            # 倒序添加history，也就是添加最近的history直到超出限制
            while next_message_to_add_index >= 0:
                # print (f"CURRENT TOKENS USED: {current_tokens_used}")
                message_to_add = full_message_history[next_message_to_add_index]                        
```

提取新的message history，然后用它更新summary memory

```python
            if len(full_message_history) > 0:
                (
                    newly_trimmed_messages,
                    agent.last_memory_index,
                ) = get_newly_trimmed_messages(
                    full_message_history=full_message_history,
                    current_context=current_context,
                    last_memory_index=agent.last_memory_index,
                )

                agent.summary_memory = update_running_summary(
                    agent,
                    current_memory=agent.summary_memory,
                    new_events=newly_trimmed_messages,
                )
                current_context.insert(insertion_index, agent.summary_memory)
```

### autogpt/memory_management/summary_memory.py

```python
def update_running_summary(
    agent: Agent, current_memory: str, new_events: List[Dict[str, str]]
) -> str:

   prompt = f'''Your task is to create a concise running summary of actions and information results in the provided text, focusing on key and potentially important information to remember.

You will receive the current summary and the your latest actions. Combine them, adding relevant key information from the latest development in 1st person past tense and keeping the summary concise.

Summary So Far:
"""
{current_memory}
"""

Latest Development:
"""
{new_events}
"""
'''

    messages = [
        {
            "role": "user",
            "content": prompt,
        }
    ]

    current_memory = create_chat_completion(messages, cfg.fast_llm_model)

    message_to_return = {
        "role": "system",
        "content": f"This reminds you of these events from your past: \n{current_memory}",
    }

    return message_to_return
```

### autogpt/llm/chat.py

```python
            # Append user input, the length of this is accounted for above
            current_context.extend([create_chat_message("user", user_input)])

            assistant_reply = create_chat_completion(
                model=model,
                messages=current_context,
                max_tokens=tokens_remaining,
            )

            # Update full message history
            full_message_history.append(create_chat_message("user", user_input))
            full_message_history.append(
                create_chat_message("assistant", assistant_reply)
            )

            return assistant_reply            
```

### autogpt/agent/agent.py

```python
            assistant_reply_json = fix_json_using_multiple_techniques(assistant_reply)

                    command_name, arguments = get_command(assistant_reply_json)

                command_result = execute_command(
                    self.command_registry,
                    command_name,
                    arguments,
                    self.config.prompt_generator,
                )
                result = f"Command {command_name} returned: " f"{command_result}"

                self.full_message_history.append(create_chat_message("system", result))                                    
```

