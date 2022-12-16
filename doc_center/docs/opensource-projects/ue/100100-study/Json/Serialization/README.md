---
title: Serialization
---

## JsonSerializer.h

```c++
	template <class CharType>
	static bool Deserialize(TJsonReader<CharType>& Reader, TSharedPtr<FJsonObject>& OutObject, EFlags InOptions = EFlags::None)
	{
		StackState State;
		if (!Deserialize(Reader, /*OUT*/State, InOptions))
		{
			return false;
		}

		if (!State.Object.IsValid())
		{
			return false;
		}

		OutObject = State.Object;

		return true;
	}

	template <class CharType, class PrintPolicy>
	static bool Serialize(const TSharedRef<FJsonObject>& Object, TJsonWriter<CharType, PrintPolicy>& Writer, bool bCloseWriter = true)
	{
		const TSharedRef<FElement> StartingElement = MakeShared<FElement>(Object);
		return FJsonSerializer::Serialize<CharType, PrintPolicy>(StartingElement, Writer, bCloseWriter);
	}  
```
