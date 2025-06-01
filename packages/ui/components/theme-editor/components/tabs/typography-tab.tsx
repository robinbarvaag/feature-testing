  <CardHeader>
    <CardTitle>Typography Settings</CardTitle>
    <CardDescription>
      Customize font sizes and text styles
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-8">
      {/* Font Size Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Font Sizes</h3>
        <p className="text-sm text-muted-foreground">
          Adjust the font size scale for different text elements
        </p>
        <div className="space-y-6">
          {Object.entries(fontSizes).map(([name, size]) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>{name}</Label>
                <span className="text-sm text-muted-foreground">
                  {size}rem
                </span>
              </div>
              <Slider
                value={[size]}
                min={0.5}
                max={4}
                step={0.125}
                onValueChange={([value]) =>
                  debouncedUpdateFontSize(name, value)
                }
              />
              <p
                style={{ fontSize: `${size}rem` }}
                className="text-muted-foreground"
              >
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </CardContent> 