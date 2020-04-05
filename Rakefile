require 'date'


desc "Compacta todos os arquivos para gerar uma versão"
task :zip do

  sh %Q(zip saber-pb.#{Date.today.strftime("%Y.%m.%d")}.zip manifest.json options.html options.js saber.js)
end

task :default => [:zip]
