
```java
/**
 * Encapsulates a Java {@link java.lang.reflect.Type}, providing access to
 * {@link #getSuperType() supertypes}, {@link #getInterfaces() interfaces}, and
 * {@link #getGeneric(int...) generic parameters} along with the ability to ultimately
 * {@link #resolve() resolve} to a {@link java.lang.Class}.
 *
 * <p>{@code ResolvableTypes} may be obtained from {@link #forField(Field) fields},
 * {@link #forMethodParameter(Method, int) method parameters},
 * {@link #forMethodReturnType(Method) method returns} or
 * {@link #forClass(Class) classes}. Most methods on this class will themselves return
 * {@link ResolvableType ResolvableTypes}, allowing easy navigation. For example:
 * <pre class="code">
 * private HashMap&lt;Integer, List&lt;String&gt;&gt; myMap;
 *
 * public void example() {
 *     ResolvableType t = ResolvableType.forField(getClass().getDeclaredField("myMap"));
 *     t.getSuperType(); // AbstractMap&lt;Integer, List&lt;String&gt;&gt;
 *     t.asMap(); // Map&lt;Integer, List&lt;String&gt;&gt;
 *     t.getGeneric(0).resolve(); // Integer
 *     t.getGeneric(1).resolve(); // List
 *     t.getGeneric(1); // List&lt;String&gt;
 *     t.resolveGeneric(1, 0); // String
 * }
 * </pre>
 *
 * @author Phillip Webb
 * @author Juergen Hoeller
 * @author Stephane Nicoll
 * @since 4.0
 * @see #forField(Field)
 * @see #forMethodParameter(Method, int)
 * @see #forMethodReturnType(Method)
 * @see #forConstructorParameter(Constructor, int)
 * @see #forClass(Class)
 * @see #forType(Type)
 * @see #forInstance(Object)
 * @see ResolvableTypeProvider
 */
```

- `Type getType()`
- `Class<?> getRawClass()`
- `Object getSource`
- `Class<?> toClass`
- `boolean isInstance`
- `boolean isAssignableFrom`
- `boolean isArray`
- `ResolvableType getComponentType`
- `ResolvableType asCollection`
- `ResolvableType asMap`
- `ResolvableType as`
- `ResolvableType getSuperType`
- `ResolvableType[] getInterfaces`
- `boolean hasGenerics`
- `boolean hasUnresolvableGenerics`
- `ResolvableType getNested`
- `ResolvableType getGeneric`
- `ResolvableType[] getGenerics`
- `Class<?>[] resolveGenerics`
- `Class<?> resolveGeneric`

## Factory methods

- `ResolvableType forClass`
- `ResolvableType forRawClass`
- `ResolvableType forClassWithGenerics`
- `ResolvableType forInstance`
- `ResolvableType forField`
- `ResolvableType forConstructorParameter`
- `ResolvableType forMethodReturnType`
- `ResolvableType forMethodParameter`
- `ResolvableType forArrayComponent`
- `ResolvableType forType`
- `void clearCache`