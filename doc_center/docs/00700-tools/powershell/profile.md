
## create profile

[https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2#how-to-create-a-profile](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.2#how-to-create-a-profile)

```
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
```

## add which command to profile

[https://stackoverflow.com/questions/63805/equivalent-of-nix-which-command-in-powershell](https://stackoverflow.com/questions/63805/equivalent-of-nix-which-command-in-powershell)

```
function which($name)
{
    Get-Command $name | Select-Object -ExpandProperty Definition
}
```