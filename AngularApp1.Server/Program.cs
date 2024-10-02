using GrapeCity.ActiveReports.Aspnetcore.Designer;
using GrapeCity.ActiveReports.Aspnetcore.Viewer;
using GrapeCity.ActiveReports.Web.Designer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddReportViewer();
builder.Services.AddReportDesigner();
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseAuthorization();
var ResourcesRootDirectory =
    new DirectoryInfo(Path.Combine(Directory.GetCurrentDirectory(), "resources"));
app.UseReportDesigner(config => config.UseFileStore(ResourcesRootDirectory, null, FileStoreOptions.NestedFoldersLookup));

app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();