{
  outputs = { nixpkgs, ... }: {
    devShell.x86_64-linux =
      let
        pkgs = nixpkgs.legacyPackages.x86_64-linux;
      in
      with pkgs; mkShell {
        packages = [ nodejs nodePackages.npm ];
        
        shellHook = ''
          export NODE_OPTIONS=--openssl-legacy-provider
        '';
      };
  };
}
